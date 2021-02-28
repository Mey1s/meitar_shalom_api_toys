# meitar_shalom_api_toys
Created by Meitar Shalom.  Server side project - creating API of toys store using MongoDB Atlas and Node JS

Meitar Shalom - Documentation
Server side project - creating API of toys store using MongoDB Atlas and Node JS

GET requests
Display all the documents of the toys' DB in json - link: https://meitar-shalom-api-toys.herokuapp.com/toys/
Search toys by name or info in the toys' DB by changing the query string "s" and switch pages by changing the query string "page" - for example: https://meitar-shalom-api-toys.herokuapp.com/toys/?s=car&page=0 (You can change "car" to any word and "0" to any number you want)
Search toys by category name, change "Here you can search" to any category you want - link: https://meitar-shalom-api-toys.herokuapp.com/toys/cat/Here you can search
Search toys by min price and max price in the toys' DB by changing the query strings "min" and "max" and switch pages by changing the query string "page" - for example: https://meitar-shalom-api-toys.herokuapp.com/toys/prices/?min=5&max=30&page=0 (You can change "5" to different min price, change "30" to different max price and change "0" to any page number you want)

POST requests (you need to use Postman tool)
Only registered users can add their toys. In Postman go to body->row->json and write your toy details like the following example: {"name": "Bus Toy", "info": "A small model of bus, high quality", "category": "Sport", "img_url": "https://images.pexels.com/photos/385997/pexels-photo-385997.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", "price": 51}. In addition, you must add the user's token in headers: KEY = "auth-token", VALUE = your token. Afterwards, change the request to POST and past the link: https://meitar-shalom-api-toys.herokuapp.com/toys/
To register: In Postman go to body->row->and write your user's details like the following example: { "name":"Moshe", "email":"moshe@abc.abc", "password":"1234" }. Afterwards, change the request to POST and past the link: https://meitar-shalom-api-toys.herokuapp.com/users/
Registered useres can login and get their token by sending their email and password. In Postman go to body->row->and write your email and password like the following example: { "email":"moshe@abc.abc", "password":"1234" }. Afterwards, change the request to POST and past the link: https://meitar-shalom-api-toys.herokuapp.com/users/login

PUT requests (you need to use Postman tool)
To edit your toy, in Postman go to body->row->json and write your updated toy details like the following example: { "name": "Football", "info": "Professional football for professional players", "category": "Sport", "img_url": "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", "price": 50 }. In addition, you must add the user's token in headers: KEY = "auth-token", VALUE = your token. Afterwards, change the request to PUT and past the link with your item ID: https://meitar-shalom-api-toys.herokuapp.com/toys/Here you write your item ID

DELETE requests (you need to use Postman tool)
To delete your toy, you must add the user's token in headers: KEY = "auth-token", VALUE = your token. Afterwards, change the request to DELETE and past the link with your item ID: https://meitar-shalom-api-toys.herokuapp.com/toys/Here you write your item ID
