node {
    checkout scm
    /* Requires the Docker Pipeline plugin to be installed */
    docker.image('node:latest').inside {
        stage('Test') {
            sh 'node --version'
        }
    }
}