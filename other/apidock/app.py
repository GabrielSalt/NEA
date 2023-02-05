#!usr/bin/env python
import cv2
from flask import Flask, request
from flask_restful import Api, Resource, reqparse
import json
import numpy as np
import tensorflow as tf
import base64

app = Flask(__name__)
api = Api(app)

model = tf.keras.models.load_model("newmodel")

image_post_args = reqparse.RequestParser()
image_post_args.add_argument('img', type=str, help='Incorrect Image Format, must be base64')

class Predict(Resource):
    def get(self):
        return {'message':'Incorrect API Call, must use POST not GET'}

    def post(self):
        args = image_post_args.parse_args() 
        grid = function(args["img"])
        return json.dumps({'message': str(grid)})

api.add_resource(Predict, "/")

def function(img):
    data = base64.b64decode(img)
    np_data = np.fromstring(data, np.uint8)
    img = cv2.imdecode(np_data, cv2.IMREAD_GRAYSCALE)
    height, width = img.shape
    nums = []
    for y in range(9):
        for x in range(9):
            left = round(x*width/9+3)
            top = round(y*height/9+3)
            right = round((x+1)*width/9-3)
            bottom = round((y+1)*height/9-3)
            image = img[top:bottom, left:right]
            image = np.array(image)
            image = cv2.resize(image, (28,28))
            image = 255-image              
            numofBlack = 0
            for r in image:
                for item in r:
                    if item > 127:
                        numofBlack += 1
            if numofBlack < 30:
                nums.append(0)
    
            else:
                pred = model.predict(image.reshape(1,28, 28, 1))
                nums.append(int(pred.argmax()))
    return {
        json.dumps(nums)
    }

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5002')