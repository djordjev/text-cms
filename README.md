# text-cms
![CPanel tests](https://github.com/djordjev/text-cms/actions/workflows/cpanel.yml/badge.svg) ![Server tests](https://github.com/djordjev/text-cms/actions/workflows/server.yml/badge.svg)

## Overview
TextCMS is a personal project aimed at providing a customizable text content management system (CMS) consisting of three main components:

1. Database (Redis)
2. Server (Go)
3. Control panel (Remix + SQLite)

With TextCMS, users can create text files within the system. Every file consists of one or more variations. Every variation has
a condition attached to it. When a user requests a file, they send data in the body of a POST request. The server then compares
the sent data against conditions for each variation and selects the most appropriate one to send back to the user. It can be useful 
in cases where different clients need to consume the same text but they have different styling/markdown systems (for example HTML/CSS 
vs mobile apps)


![text-cms](https://github.com/djordjev/text-cms/assets/6445853/b1d9a705-f76e-471a-9144-5b632e05c121)


## Development
In order to run the system locally all you need to have [docker](https://www.docker.com/) installed. Then in home directory run
```
docker compose up
```

That will build and run following containers:
1. Redis on port `6379`
2. Server on port `3004`
3. Control panel web application on port `3000`. This container will have also local SQLite database but it's private to this service and not exposed

When running the compose for the first time it will build containers and seed data in databases. So you can just access control panel on
[http://localhost:3000](http://localhost:3000). You can create account and after login you can create new files and edit it's variations.
Once file is created all it's variations together with conditions are stored in Redis database and should be accessed through api exposed by Go
server. Files endpoint is prefixed with `/file` segment.
So for example if you create file on location `/Folder1/NewFile.txt` to get it's content you can fire POST request (curl, wget, postman)
to localtion `http//localhost:3004/file/Folder1/NewFile.txt`. The body of request can be any JSON. If you have different variations server
will return the first one matching conditions.

Database seed contains example file called Home.txt in root directory (`http://localhost:3004/file/Home.txt`). You can test different variations
by sending those POST reqests:
```
{
  "logged_in": false
}
```

or

```
{
  "logged_in": true,
  "username": "Test username"
}
```

## Response format

Server returns JSON array with text from the first variation matched. Array consists of one or many objects having propery `type`. First level
objects should be condidered as text block and each one should be rendered below previous one.
Possible values of `type` propery are `paragraph` and `heading`. Beside it, it will have another property `children` which is an array of nodes.

### Heading
Different sizes of heading element. Beside `type` and `children` properties it will have:
1. `level` property which is a number indicating size of heading (h1...h6)
2. `align` propery (optional) which can be `left`, `center` or `right`. If not present text should be left aligned.
3. `children` array having a list of `nodes` that should be rendered within current heading

### Paragraph
1. Optional `align` property with the same meaning as in heading element.
2. `children` array with the same meaning as in heading element.

### Nodes
Node is a JSON object having `text` propery in simplest form. It's returned as element of `children` property of `heading` or `paragraph`.
Each node should be rendered one after another (inline) as child of parent element. Beside `text` property each node can optinally have one of
following properties:
1. `bold` - optional boolean. Indicates if text should be bolded
2. `underline` - optional boolean. Indicates if text should be underlined
3. `italic` - optional boolean. Indicates if text should be italic
4. `strikethrough` - optional boolean. Indicates if text should be striked through
5. `color` - optional string. Hex value of text color.

### Interactive nodes
Some nodes might be clickable (links and buttons). Such nodes will have property `click` which is an object. If present it will have following
properties:
1. `type` - required, one of following: `link`, `primary` or `secondary`. Indicates styling of interactive element. Consuming application can
2. decide exact styling for each of those types
3. `href` - optional string. If the `type` is `link` it should contain URL where it should link. In case of buttons it can be omitted.
4. `action` - optional string. TextCMS just passes this value without any semantic meaning. It can be used to identify what `button` click
5. on button should do.
