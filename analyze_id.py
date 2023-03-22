import sys
import boto3
import json

def analyze_id(region, bucket_name, file_name):
    client = boto3.client('textract', region_name=region)
    response = client.analyze_id(
        DocumentPages=[{'S3Object': {'Bucket': bucket_name, 'Name': file_name}}])

    extracted_data = []

    for doc_fields in response['IdentityDocuments']:
        for id_field in doc_fields['IdentityDocumentFields']:
            data = {}
            for key, val in id_field.items():
                if "Type" in str(key):
                    data['type'] = str(val['Text'])
                if "ValueDetection" in str(key):
                    data['value_detection'] = str(val['Text'])
            extracted_data.append(data)
    return extracted_data

if __name__ == "__main__":
    region = sys.argv[1]
    bucket_name = sys.argv[2]
    file_name = sys.argv[3]
    extracted_data = analyze_id(region, bucket_name, "dl1.jpg")
    print(json.dumps(extracted_data))

    #analyze_id("us-east-1", "readdl", "dl1.jpg")

