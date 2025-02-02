from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain.embeddings import HuggingFaceBgeEmbeddings
from langchain.document_loaders import PyPDFLoader, DirectoryLoader
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_groq import ChatGroq
import os

app = Flask(__name__)
CORS(app)

# Initialize LLM
def initialize_llm():
    
    llm = ChatGroq(
        temperature=0,
        groq_api_key="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",
        model_name="llama-3.3-70b-versatile"
    )
    return llm


# Load or Create Vector DB
def load_or_create_vector_db():
    db_path = "C:/arya/4 TH YEAR/MAJOR PROJECT/Corner/backend/src/content"
    persist_directory = "./chroma_db"
    
    if not os.path.exists(persist_directory):
        loader = DirectoryLoader(db_path, glob="*.pdf", loader_cls=PyPDFLoader)
        documents = loader.load()
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
        texts = text_splitter.split_documents(documents)
        embeddings = HuggingFaceBgeEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2')
        vector_db = Chroma.from_documents(texts, embeddings, persist_directory=persist_directory)
        vector_db.persist()
    else:
        embeddings = HuggingFaceBgeEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2')
        vector_db = Chroma(persist_directory=persist_directory, embedding_function=embeddings)
        
    return vector_db


# Setup the chatbot pipeline
def setup_qa_chain(vector_db, llm):
    retriever = vector_db.as_retriever()
    prompt_template = """
    You are a compassionate mental health chatbot. Respond thoughtfully to the following question:
    {context}
    User: {question}
    Chatbot: """
    
    PROMPT = PromptTemplate(template=prompt_template, input_variables=['context', 'question'])
    
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        chain_type_kwargs={"prompt": PROMPT}
    )
    return qa_chain


# Initialize components
llm = initialize_llm()
vector_db = load_or_create_vector_db()
qa_chain = setup_qa_chain(vector_db, llm)

# API route to handle chatbot queries
@app.route("/chatbot", methods=["POST"])
def chatbot_response():
    query = request.json.get("query")
    if not query:
        return jsonify({"response": "Please provide a query"}), 400

    response = qa_chain.run(query)
    return jsonify({"response": response})


if __name__ == "__main__":
    app.run(port=5001)