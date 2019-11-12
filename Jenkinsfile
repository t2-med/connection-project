// node('docker') {
 
//     stage 'Checkout'
//         checkout scm
//     stage 'Build & UnitTest'
//         sh "docker build -t med2bouanane/node_connection:B${BUILD_NUMBER} -f Dockerfile ."
//         sh "docker build -t accountownerapp:test-B${BUILD_NUMBER} -f Dockerfile.Integration ."
  
//     stage 'Integration Test'
//         sh "docker-compose -f docker-compose.integration.yml up --force-recreate --abort-on-container-exit"
//         sh "docker-compose -f docker-compose.integration.yml down -v"
// }

node {
    stage('Clone repository') {
        checkout scm
    }
    /* Requires the Docker Pipeline plugin to be installed */
    docker.image('node:latest').inside {
        stage('Test') {
            sh 'node --version'
        }
    }
}

// pipeline {
//     agent {
//         docker { image 'node:7-alpine' }
//     }
//     stages {
//         stage('Test') {
//             steps {
//                 sh 'node --version'
//             }
//         }
//     }
// }