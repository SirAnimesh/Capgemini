# Hooligan API

A REST API server written in [Deno](https://deno.land/)

### Local run

```shell
# cwd is project root
$ docker-compose up -d api
```

### Endpoints

To be replaced by an OpenAPI spec

```
GET /health   -  Server status, used for Docker healthcheck, can be used for a status screen too after some modification
POST /police-data  - Returns aggregate crime data for Premier league stadiums for a given year, see example below
```

### Examples

```shell
$ curl "http://localhost:3000/health"
```

```shell
$ curl -X "POST" "http://localhost:3000/police-data" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "year": "2021",
  "stadiums": [
    {
      "name": "Emirates (Arsenal)",
      "longitude": "-0.108611",
      "latitude": "51.555"
    }
  ]
}'
```