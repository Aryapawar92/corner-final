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
    You are a compassionate mental health chatbot. Respond thoughtfully to the user's question.

    - Provide at least **100 words** in response.
    - Use **bullet points**, ensuring each appears on a **new line**.
    - Limit responses to **7 points** max for clarity.
    - Keep each point **short and precise** (2-3 sentences per point).
    - Avoid unnecessary details.

    {context}

    User: {question}

    Chatbot:
    - """

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
    data = request.json
    query = data.get("query")
    stress_level = data.get("stress_level")

    if not query:
        return jsonify({"response": "Please provide a query"}), 400

    # Generate response based on query
    response = qa_chain.run(query)

    # If stress level is high, provide remedies
    remedies = ""
    if stress_level is not None and stress_level >= 2:
        remedy_query = f"Provide detailed remedies for stress relief (at least 100 words) for stress level {stress_level}."
        remedies_response = qa_chain.run(remedy_query)
        
        # Ensure remedies are in bullet points, with proper new lines
        remedies = "\n\n🛠 **Recommended Remedies:**\n" + "\n".join(
            [f"- {point.strip()}" for point in remedies_response.split("\n") if point]
        )

    # Ensure chatbot response is at least 100 words, in bullet points with new lines
    formatted_response = "\n".join([f"- {point.strip()}" for point in response.split("\n") if point])

    return jsonify({"response": formatted_response + remedies})


if __name__ == "__main__":
    app.run(port=5001)
