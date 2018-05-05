# GameCollector API Rest v6

API REST Unit Testing using:

- Mocha
- Chai
- Sinon
- Supertest

Also includes coverage with:

- istanbul

And quality control center with:

- sonarqube

### Run tests

```shell
$ npm run test
```

### Run test with coverage using istanbul module

```shell
$ npm run cover
```

### Start sonarqube

To use sonarqube, you need docker, docker-compose and sonar-scanner installed (if not, view part 4 of this tutorial how to do it)

go to folder docker-servers and execute to start sonarqube:

```
$ docker-compose up -d
```

When sonarqube is started execute:

```shell
sonar-scanner
```

If you executed the tests before, you will obtain the results in sonarqube.

Enjoy it!



