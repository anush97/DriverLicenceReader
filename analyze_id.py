import boto3
import sys

def analyze_id(region, bucket_name, file_name):

    # Detect text in the document
    client = boto3.client('textract', region_name=region)

    # process using S3 object
    response = client.analyze_id(
        DocumentPages=[{'S3Object': {'Bucket': bucket_name, 'Name': file_name}}])

    for doc_fields in response['IdentityDocuments']:
        for id_field in doc_fields['IdentityDocumentFields']:
            for key, val in id_field.items():
                if "Type" in str(key):
                    print("Type: " + str(val['Text']))
            for key, val in id_field.items():
                if "ValueDetection" in str(key):
                    print("Value Detection: " + str(val['Text']))
            print()

'''def main():
    bucket_name = "readdl"
    file_name = "dl1.jpg"
    region = "us-east-1"

    analyze_id(region, bucket_name, file_name)'''

if __name__ == "__main__":
    region = sys.argv[1]
    bucket_name = sys.argv[2]
    file_name = sys.argv[3]
    #analyze_id("us-east-1", "readdl", "dl1.jpg")
    analyze_id(region, bucket_name, file_name)
