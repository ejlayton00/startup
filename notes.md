# Midterm Review
- ```<link rel="stylesheet" href="styles.css">```
- ```<script src="javascript.js"></script>```
- ```<div [id="something" class="something"]>[insert content]</div>```
- Difference between "#title" and ".grid": #title is an id; .grid is a class
- Difference between padding and margin: margin is around the border of the object; padding is between border and content
- Arrow syntax: ```((element) => { function(); });```
- ```document.getElementByID("#id")``` gets the element of "#id" from the document
- ```addEventListenenr("type", "listener")``` adds the function in "listener" to "type" (like "click")
- CSS example: .div { background-color: red; }
- IMG example: ```<img src='./images/image.png' href='link.html'>```
- QuerySelector example: ```document.getElementByID("#byu").style.color = 'green';```

# Final Review
- Ports
    - SSH: 22
    - HTTP: 80
    - HTTPS: 443
- Status Codes
    - 300: Redirection
        - 300: Multiple Choices
        - 301: Moved Permanently
        - 302: Moved Temporarily
        - 304: Not Modified
    - 400: Client Errors
        - 400: Bad request
        - 401: Unauthorized
        - 403: Forbidden
        - 404: Not Found
    - 500: Server Errors
        - 500: Internal Server Error
        - 501: Not Implemented
        - 502: Bad Gateway
        - 503: Service Unavailable
- ```content-type``` Header: Media type
- Cookie
    - Domain: Where cookie is valid
    - Path: Where in domain cookie is valid
    - SameSite: When is a cookie sent?
        - Strict: Can only be sent in first-party context
        - Lax: First-party and top-level Gets
        - None: All contexts
    - HTTPOnly: Cookie can't be accessed through javascript