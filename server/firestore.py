import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("config/promptopedia-credentials.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

data = {
    'prompt': 'Sample prompt',
    'tags': 'sameple tags'
}

#--------Creating collection and adding data ------#
# creating collection
doc_ref = db.collection('promptsCollection').document()

# adding data to that collection
# doc_ref.set(data)

# print('Document Id:', doc_ref.id)

#-------- Accessing documents and data----------#
def getAllDocs(collectionName):
    docs = (
        db.collection(collectionName)
        .stream()
    )
    print("docs:", docs)

    # iterating over documents and store id, data in list
    document_list = []
    for doc in docs:
        print("doc:", doc)

        # converting doc object to string
        doc_data = doc.to_dict()

        doc_data["id"] = doc.id
        doc_data["docData"] = doc._data
        document_list.append(doc_data)

    print("document_list:", document_list)

    # iterating over the list

    for document in document_list:
        print(f"Document Id: {document['id']}")
        print(f"Document Data: {document['docData']}")
        print()


# getAllDocs("promptsCollection")

#---------get specific document ----------#

def getDocument(collectionName, documentId):
    # provided reference to document | document.DocumentReference
    doc_ref = db.collection(collectionName).document(documentId)
    print(f"doc_ref: {doc_ref}")

    # provides snapshot of reference | base_document.DocumentSnapshot
    doc = doc_ref.get()
    print(f"doc: {doc}")

    # converting doc object to string | .to_dict()
    if doc.exists:
        return doc.to_dict()
    else:
        print(f"Document {documentId} not found in the collection {collectionName}")
        return None

# print(getDocument('promptsCollection', '3Vw2fmKYZGLH2Ag9xsRu'))

# ------ get documents with filter | where | FieldFilter ---------#

# ----- update existing document -------#
