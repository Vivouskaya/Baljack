if (Tables.find().count() < 1) {
  Tables.insert({
    name: 'First Table'
  });
  Tables.insert({
    name: 'Second Table'
  });

  var allTables = Tables.find().fetch();
  allTables.forEach(function(table) {
    //initialisation du score de chaque croupier
    Score.insert({userId: 'croupierID_'+table._id, tableId: table._id, score: 0});
  });
}

if (Cards.find().count() === 0) {
  Cards.insert({ name: 'As', value: 11, numero: 1, path: '', sign : "As ♥" });
  Cards.insert({ name: '2', value: 2, numero: 2, path: '', sign : "2 ♥" });
  Cards.insert({ name: '3', value: 3, numero: 3, path: '', sign : "3 ♥" });
  Cards.insert({ name: '4', value: 4, numero: 4, path: '', sign : "4 ♥" });
  Cards.insert({ name: '5', value: 5, numero: 5, path: '', sign : "5 ♥" });
  Cards.insert({ name: '6', value: 6, numero: 6, path: '', sign : "6 ♥" });
  Cards.insert({ name: '7', value: 7, numero: 7, path: '', sign : "7 ♥" });
  Cards.insert({ name: '8', value: 8, numero: 8, path: '', sign : "8 ♥" });
  Cards.insert({ name: '9', value: 9, numero: 9, path: '', sign : "9 ♥" });
  Cards.insert({ name: '10', value: 10, numero: 10, path: '', sign : "10 ♥" });
  Cards.insert({ name: 'J', value: 10, numero: 11, path: '', sign : "J ♥" });
  Cards.insert({ name: 'Q', value: 10, numero: 12, path: '', sign : "Q ♥" });
  Cards.insert({ name: 'K', value: 10, numero: 13, path: '', sign : "K ♥" });
  Cards.insert({ name: 'As', value: 11, numero: 14, path: '', sign : "As ♠" });
  Cards.insert({ name: '2', value: 2, numero: 15, path: '', sign : "2 ♠" });
  Cards.insert({ name: '3', value: 3, numero: 16, path: '', sign : "3 ♠" });
  Cards.insert({ name: '4', value: 4, numero: 17, path: '', sign : "4 ♠" });
  Cards.insert({ name: '5', value: 5, numero: 18, path: '', sign : "5 ♠" });
  Cards.insert({ name: '6', value: 6, numero: 19, path: '', sign : "6 ♠" });
  Cards.insert({ name: '7', value: 7, numero: 20, path: '', sign : "7 ♠" });
  Cards.insert({ name: '8', value: 8, numero: 21, path: '', sign : "8 ♠" });
  Cards.insert({ name: '9', value: 9, numero: 22, path: '', sign : "9 ♠" });
  Cards.insert({ name: '10', value: 10, numero: 23, path: '', sign : "10 ♠" });
  Cards.insert({ name: 'J', value: 10, numero: 24, path: '', sign : "J ♠" });
  Cards.insert({ name: 'Q', value: 10, numero: 25, path: '', sign : "Q ♠" });
  Cards.insert({ name: 'K', value: 10, numero: 26, path: '', sign : "K ♠" });
  Cards.insert({ name: 'As', value: 11, numero: 27, path: '', sign : "As ♦" });
  Cards.insert({ name: '2', value: 2, numero: 28, path: '', sign : "2 ♦" });
  Cards.insert({ name: '3', value: 3, numero: 29, path: '', sign : "3 ♦" });
  Cards.insert({ name: '4', value: 4, numero: 30, path: '', sign : "4 ♦" });
  Cards.insert({ name: '5', value: 5, numero: 31, path: '', sign : "5 ♦" });
  Cards.insert({ name: '6', value: 6, numero: 32, path: '', sign : "6 ♦" });
  Cards.insert({ name: '7', value: 7, numero: 33, path: '', sign : "7 ♦" });
  Cards.insert({ name: '8', value: 8, numero: 34, path: '', sign : "8 ♦" });
  Cards.insert({ name: '9', value: 9, numero: 35, path: '', sign : "9 ♦" });
  Cards.insert({ name: '10', value: 10, numero: 36, path: '', sign : "10 ♦" });
  Cards.insert({ name: 'J', value: 10, numero: 37, path: '', sign : "J ♦" });
  Cards.insert({ name: 'Q', value: 10, numero: 38, path: '', sign : "Q ♦" });
  Cards.insert({ name: 'K', value: 10, numero: 39, path: '', sign : "K ♦" });
  Cards.insert({ name: 'As', value: 11, numero: 40, path: '', sign : "As ♣" });
  Cards.insert({ name: '2', value: 2, numero: 41, path: '', sign : "2 ♣" });
  Cards.insert({ name: '3', value: 3, numero: 42, path: '', sign : "3 ♣" });
  Cards.insert({ name: '4', value: 4, numero: 43, path: '', sign : "4 ♣" });
  Cards.insert({ name: '5', value: 5, numero: 44, path: '', sign : "5 ♣" });
  Cards.insert({ name: '6', value: 6, numero: 45, path: '', sign : "6 ♣" });
  Cards.insert({ name: '7', value: 7, numero: 46, path: '', sign : "7 ♣" });
  Cards.insert({ name: '8', value: 8, numero: 47, path: '', sign : "8 ♣" });
  Cards.insert({ name: '9', value: 9, numero: 48, path: '', sign : "9 ♣" });
  Cards.insert({ name: '10', value: 10, numero: 49, path: '', sign : "10 ♣" });
  Cards.insert({ name: 'J', value: 10, numero: 50, path: '', sign : "J ♣" });
  Cards.insert({ name: 'Q', value: 10, numero: 51, path: '', sign : "Q ♣" });
  Cards.insert({ name: 'K', value: 10, numero: 52, path: '', sign : "K ♣" });
}
