pipeline {
 agent any
 environment {
 CI = 'true'
 }
 stages {
 stage('Checkout') {
 steps {
 git branch: 'main', 
        url: 'https://github.com/MohHaikalsalehHamizid/praktikum-ppmpl_8.git',
        credentialsId: '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'
 }
 }
 stage('Install Dependencies') {
 steps {
 sh 'npm install'
 }
 }
 stage('Run Unit Tests') {
 steps {
 sh 'npm test'
 }
 }
 stage('Build') {
 steps {
 echo 'Building the application...'
 // Tambahkan perintah build jika diperlukan
 }
 }
 stage('staging deploy') {
            when {
                branch 'develop'
            }
            steps {
                echo 'Deploying to staging server...'
                sh '''
                    ssh user@staging-server "cd /path/to/app && git pull origin develop && npm install && npm run build"
                '''
            }
        }
        stage('production deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying to production server...'
                sh '''
                    ssh user@production-server "cd /path/to/app && git pull origin main && npm install && npm run build"
                '''
            }
        }
 }
 post {
 success {
 emailext subject: 'Build Succeeded', body: 'The build succeeded!',
recipientProviders: [[$class: 'DevelopersRecipientProvider']]
 }
 failure {
 emailext subject: 'Build Failed', body: 'The build failed.',
recipientProviders: [[$class: 'DevelopersRecipientProvider']]
 }
}
}