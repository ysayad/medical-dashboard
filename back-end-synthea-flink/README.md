# Flink SQL demo with Synthea

The goal of this repository is to have a working Apache Flink sample notebook coupled to Apache Kafka, using the Python [streaming-jupyter-integrations](https://github.com/getindata/streaming-jupyter-integrations) library. Caution: everything is working with Apache Flink 1.18.1, but previous versions do not seem to work.

Requirements
===

You need to have installed the following:
- Python 3.10 and pip install. Tested with venv.
- Java 11
- Docker and Docker Compose

Install Python requirements:
```bash
pip install -r requirements.txt
```

Or if you want to use VsCode, create a new Venv environment by launching "Python: Create environment" and make VsCode install the requirements. 

## Synthea data generator

We use the [Synthea](https://synthetichealth.github.io/synthea/) data generator. 

### Install

Please install first the Synthea generator using the following command:

```bash
wget https://github.com/synthetichealth/synthea/releases/download/master-branch-latest/synthea-with-dependencies.jar
```

Generate some simple samples (2 patients by default):
```bash
java -jar ./synthea-with-dependencies.jar
```

To go into further details, please check [https://github.com/synthetichealth/synthea/wiki/Basic-Setup-and-Running](https://github.com/synthetichealth/synthea/wiki/Basic-Setup-and-Running) and [https://synthetichealth.github.io/spt/#/record_viewer](https://synthetichealth.github.io/spt/#/record_viewer).

## Flink notebook

We provide a Docker Compose file installing Apache Flink, Apache Kafka and a Web UI for Apache Kafka. 
```bash
docker compose up
```

The Flink port is exposed on the [8081](http://localhost:8081) port, and the Kafka UI is exposed on the [8082](http://localhost:8082) port.  

The [extract_from_fhir](extract_from_fhir.ipynb) notebook resets the docker compose Flink and Kafka installation, reads Synthea data from the [output](output/) directory and insert it in corresponding topics (Patient, Hospital, DiagnosticReport, Practioner, etc.). Data should have been generated before.

The [flink_query](flink_query.ipynb) notebook show queries using the [streaming-jupyter-integrations](https://github.com/getindata/streaming-jupyter-integrations) library.

Add the jar for the kafka connector : 
```bash
wget https://repo1.maven.org/maven2/org/apache/flink/flink-sql-connector-kafka/3.0.1-1.18/flink-sql-connector-kafka-3.0.1-1.18.jar
```

modify the flink-conf.yaml with your current path :
```bash
pipeline.jars: file:///your_current_path/flink-sql-connector-kafka-3.0.1-1.18.jar
```

Chanege the path for the jar and the flink conf : 
```bash
%env FLINK_CONF_DIR=your_current_path/config
```

Add the jdbc connector : 
```bash
wget https://repo1.maven.org/maven2/org/apache/flink/flink-connector-jdbc/3.2.0-1.18/flink-connector-jdbc-3.2.0-1.18.jar
```
