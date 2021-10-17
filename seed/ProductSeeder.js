var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/shopping", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var products = [
    new Product({
        imagePath: 'https://image.ceneostatic.pl/data/products/109852085/i-battlefield-2042-gra-pc.jpg',
        title: 'Battlefield 2042',
        description: 'Battlefield 2042 to powrót do wojny totalnej, z której słynie ta kultowa seria gier. Dynamicznie zmieniające się pola bitew będą wymagały od ciebie adaptacji i przezwyciężania trudności przy pomocy twojej drużyny i nowoczesnego arsenału.',
        price: 60
    }),
    new Product({
        imagePath: 'https://www.mobygames.com/images/covers/l/692205-ghostrunner-xbox-one-front-cover.jpg',
        title: 'Ghostrunner',
        description: 'Ghostrunner offers a unique single-player experience: fast-paced, violent combat, and an original setting that blends science fiction with post-apocalyptic themes.',
        price: 20
    }),
    new Product({
        imagePath: 'https://static.muve.pl/uploads/product-cover/0044/2348/gra-pc-overwatch-legendary-edition-1164932-3366428-1495x2117w50.jpg',
        title: 'Overwatch',
        description: 'Dołącz do ponad 50 milionów graczy i wejdź do świata Overwatch. Wybierz bohatera spośród całej plejady żołnierzy, naukowców, awanturników i odmieńców. Zaginaj czas, łam prawa fizyki i stosuj oszałamiający arsenał uzbrojenia oraz niesamowitych mocy.',
        price: 35
    }),
    new Product({
        imagePath: 'https://store-images.s-microsoft.com/image/apps.33719.71220804959101191.bad88979-60b4-40b4-af6d-182d4534c987.ecf3220f-0497-4cf1-9cee-d46d9d86ecc3',
        title: 'FarCry 3',
        description: 'Discover the dark secrets of a lawless island ruled by violence and take the fight to the enemy as you try to escape. You’ll need more than luck to escape alive!',
        price: 15
    }),
    new Product({
        imagePath: 'https://image.ceneostatic.pl/data/products/47570063/i-minecraft-java-edition-digital.jpg',
        title: 'Minecraft',
        description: 'Przygotuj się na przygodę pełną nieskończonych możliwości – buduj, wydobywaj surowce, walcz z mobami i eksploruj nieustannie zmieniający się krajobraz Minecraft.',
        price: 15
    }),
];

var done = 0;

for (var i = 0; i < products.length; i++){
    products[i].save(function(err, result){
        done++
        if(done == products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect;
}