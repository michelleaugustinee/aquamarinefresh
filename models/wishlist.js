// Fungsi pada wishlist
module.exports = function Wishlist(oldWishlist) {
  this.items = oldWishlist.items || {};
  this.totalQty = oldWishlist.totalQty || 0;
  this.totalPrice = oldWishlist.totalPrice || 0;

  // Menambahkan item yang ada (dari product list)
  this.add = function (item, id) {
    var storedItem = this.items[id];
    if (!storedItem) {
      storedItem = this.items[id] = { item: item, qty: 0, price: 0 };
    }
    storedItem.qty++;
    storedItem.price = storedItem.item.price * storedItem.qty;
    this.totalQty++;
    this.totalPrice += storedItem.item.price;
  };

  // Mengurangi item
  this.reduce = function (id) {
    this.items[id].qty--;
    this.items[id].price = this.items[id].item.price;
    this.totalQty--;
    this.totalPrice -= this.items[id].price;
    if (this.items[id].qty <= 0) {
      delete this.items[id];
    }
  };

  // Menambahkan item
  this.increase = function (id) {
    this.items[id].qty++;
    this.items[id].price = this.items[id].item.price * this.items[id].qty;
    this.totalQty++;
    this.totalPrice += this.items[id].item.price;
  };

  // Menghapus item
  this.removeItem = function (id) {
    this.totalQty -= this.items[id].qty;
    this.totalPrice -= this.items[id].price;
    delete this.items[id];
  };

  // Mengubah isi array dari product
  this.generateArray = function () {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
};
