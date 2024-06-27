import subprocess
import os
import glob
import json
import jmespath
from kafka import KafkaProducer
import random
import time
import string

# Liste des états des États-Unis
states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]

def generate_seed(length=10):
    """Generate a random seed."""
    return ''.join(random.choices(string.digits, k=length))

def execute_jar(jar_path, seed, state):
    print(f"Executing jar file with seed {seed} and state {state}...")
    subprocess.run(['java', '-jar', jar_path, '-s', seed, state], check=True)
    print("Jar execution completed.")

def load_fhir_resources(f):
    with open(f, "r") as file:
        data = json.load(file)
    resources = jmespath.search("entry[*]", data)
    return resources

def send_resources_to_kafka(resources):
    producer = KafkaProducer(bootstrap_servers='localhost:9095', value_serializer=lambda v: json.dumps(v).encode('utf-8'))
    for resource in resources:
        if "fullUrl" in resource:
            print("{} - {} ".format(resource["resource"]["resourceType"], resource["fullUrl"]))
        else:
            print(resource["id"])
        producer.send(resource["resource"]["resourceType"], key=resource["fullUrl"].encode(), value=resource["resource"])
    print("Waiting for flush...")
    producer.flush()

def process_files(file_pattern):
    # Process patient files first (excluding hospitalInformation and practitionerInformation)
    for f in glob.glob(file_pattern):
        if "hospitalInformation" not in f and "practitionerInformation" not in f:
            print(f"Loading {f}")
            resources = load_fhir_resources(f)
            send_resources_to_kafka(resources)

    # Process practitionerInformation files
    for f in glob.glob(file_pattern):
        if "practitionerInformation" in f:
            print(f"Loading {f}")
            resources = load_fhir_resources(f)
            send_resources_to_kafka(resources)

    # Process hospitalInformation files
    for f in glob.glob(file_pattern):
        if "hospitalInformation" in f:
            print(f"Loading {f}")
            resources = load_fhir_resources(f)
            send_resources_to_kafka(resources)

def clean_up(directories):
    for directory in directories:
        for f in glob.glob(f"{directory}/*"):
            try:
                os.remove(f)
                print(f"Deleted {f}")
            except OSError as e:
                print(f"Error deleting {f}: {e}")

if __name__ == "__main__":
    jar_path = "synthea-with-dependencies.jar"
    output_dirs = ["output/fhir", "output/metadata"]
    
    while True:
        seed = generate_seed()
        state = random.choice(states)
        
        execute_jar(jar_path, seed, state)
        
        # Process all files with the correct exclusions
        process_files("output/fhir/*")
        
        # Clean up output files in both directories
        clean_up(output_dirs)
        
        # Wait for 2 minutes before next iteration
        time.sleep(30)
