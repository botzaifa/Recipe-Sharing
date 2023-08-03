from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)

# Connect to the MongoDB database
client = MongoClient('mongodb+srv://botzaifa:4fiazuh7123mongo@cluster0.cfcrvb4.mongodb.net/')  # Replace with your MongoDB connection string
db = client['Recipe']
collection = db['Recipes']

# Serve the frontend
@app.route('/')
def index():
    return render_template('index.html')

# Route to get all recipes
@app.route('/api/recipes', methods=['GET'])
def get_all_recipes():
    recipes = list(collection.find({}, {'_id': False}))
    return jsonify(recipes)

# Route to add a new recipe
@app.route('/api/recipes', methods=['POST'])
def add_recipe():
    data = request.get_json()
    new_recipe = {
        "title": data["title"],
        "ingredients": data["ingredients"],
        "cooking_instructions": data["cooking_instructions"],
        "preparation_time": data["preparation_time"],
        "likes": 0,
        "favorites": 0
    }
    result = collection.insert_one(new_recipe)
    new_recipe['_id'] = str(result.inserted_id)
    return jsonify(new_recipe), 201

# Route to update a recipe
@app.route('/api/recipes/<recipe_id>', methods=['PUT'])
def update_recipe(recipe_id):
    data = request.get_json()
    query = {'_id': ObjectId(recipe_id)}
    update = {'$set': data}
    result = collection.update_one(query, update)

    if result.modified_count > 0:
        updated_recipe = collection.find_one(query, {'_id': False})
        return jsonify(updated_recipe)
    else:
        return jsonify({"message": "Recipe not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
