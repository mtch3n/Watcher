## Watcher - Server Monitoring Tool

### Configs
> #### Server List

`
config/server.json
`

Supports database, http(s) servers, ssh, etc.[Learn more about 'Service Name and Transport Protocol'](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml)

```json
[
    {
        "name": "name",
        "host": "hostname(ip)",
        "ports": [
            {
                "name": "protocal (RFC6335 Standard)",
                "port": "80"
            }
        ],
        "alert": "alert_on_server_down(bool)"
    }
]
```
__Setting the TLS ServerName to an IP address is not permitted by RFC 6066. This will be ignored in a future version.__


> #### Mail List

`
config/mail.json
`

```json
{
    "mail": [
        "mingchen@starlux-airlines.com",
        "tester@starlux-airlines.com",
        "JohnDoe@example.com",
        "foo@bar.net"
    ]
}
```

### API
> #### Server
List all server in config
```
GET: http://localhost/api/server
```
Result:

```json
[
    {
        "name": "bella_ssh",
        "host": "1.2.3.4",
        "ports": [
            {
                "protocol": "ssh",
                "port": "22"
            }
        ],
        "alert": true
    },
    {
        "name": "dev_db",
        "host": "10.20.99.75",
        "ports": [
            {
                "protocol": "mysql",
                "port": "3306"
            }
        ],
        "alert": true
    }
]
```

Get a server detail
```
GET: http://localhost/api/server/[name]
```
```json
[
    {
        "name": "local",
        "protocol": "http",
        "host": "127.0.0.1:80",
        "status": false,
        "msg": "Error: connect ECONNREFUSED 127.0.0.1:80",
        "alert": false
    },
    {
        "name": "local",
        "protocol": "other",
        "host": "127.0.0.1:4328",
        "status": false,
        "msg": "no matching service protocol",
        "alert": false
    }
]
```
> #### Status
Get all server status
```
GET: http://localhost/api/status
```
Result:

```json
[
    {
        "name": "bella_ssh",
        "protocol": "ssh",
        "host": "4.3.2.1:22",
        "status": true,
        "msg": "success",
        "alert": true
    },
    {
        "name": "dev_db",
        "protocol": "mysql",
        "host": "1.2.3.4:3306",
        "status": true,
        "msg": "success",
        "alert": true
    }
]
```
Get one server detail
```
GET: http://localhost/api/status/[name]
```
```json
[
    {
        "name": "local",
        "protocol": "http",
        "host": "127.0.0.1:80",
        "status": false,
        "msg": "Error: connect ECONNREFUSED 127.0.0.1:80",
        "alert": false
    },
    {
        "name": "local",
        "protocol": "other",
        "host": "127.0.0.1:4328",
        "status": false,
        "msg": "no matching service protocol",
        "alert": false
    }
]
```
