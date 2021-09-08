const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection errpr:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6127df21be6e6278b31c2673',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto omnis debitis animi nisi dignissimos provident consequatur mollitia. Delectus, consequuntur autem! Quia reiciendis veritatis labore fugiat praesentium perspiciatis voluptatem quos non.',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/djjnlphqd/image/upload/v1630063799/YelpCamp/wabulie6jczctqokic4o.jpg',
                    filename: 'YelpCamp/wabulie6jczctqokic4o',
                },
                {
                    url: 'https://res.cloudinary.com/djjnlphqd/image/upload/v1630063808/YelpCamp/ddmfn9dzpo2g3a3lk3yp.jpg',
                    filename: 'YelpCamp/ddmfn9dzpo2g3a3lk3yp',
                }
            ],
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            }
        });
        await camp.save()
    }
};

seedDB().then(() => {
    mongoose.connection.close()
})