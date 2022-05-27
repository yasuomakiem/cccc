var Product = /** @class */ (function () {
    function Product() {
    }
    return Product;
}());
var ProductService = /** @class */ (function () {
    // phương thức khởi tạo
    function ProductService() {
        // thuộc tính
        this.product = [];
        // kiểm tra trong localStorage có key là product ko 
        //có thì gán giá trị lấy được từ localStorage gán vào thuộc tính product ở trên
        // không thì gán mản rỗng cho nó
        if (localStorage.getItem('product')) {
            var data = localStorage.getItem('product');
            this.product = JSON.parse(data);
        }
        else {
            this.product = [];
        }
    }
    // phương thức thêm mới
    ProductService.prototype.create = function (pro) {
        // thêm phần tử vào mảng
        this.product.push(pro);
        // lưu vào localStorage với key là product 
        localStorage.setItem('product', JSON.stringify(this.product));
        return true;
    };
    // phương thức đọc để hiển thị ra màn hình
    ProductService.prototype.read = function () {
        var _html = "";
        this.product.forEach(function (element, index) {
            _html += " <tr>\n            <td>".concat(element.id, "</td>\n            <td>").concat(element.name, "</td>\n            <td>").concat(element.price, "</td>\n            <td><button onclick=\"deleteProduct(").concat(element.id, ")\">X</button></td>\n            <td><button onclick=\"update(").concat(element.id, ")\">Update</button></td>\n        </tr>");
        });
        document.getElementById('hung').innerHTML = _html;
    };
    ProductService.prototype["delete"] = function (id) {
        for (var key in this.product) {
            if (this.product[key].id == id) {
                var keycheck = key;
            }
        }
        this.product.splice(parseInt(keycheck), 1);
        localStorage.setItem('product', JSON.stringify(this.product));
    };
    return ProductService;
}());
// khởi tạo đối tượng proS từ class ProductService
var proS = new ProductService();
// gọi đến phương thức hiển thị danh sách ra màn ginhf
proS.read();
function deleteProduct(idcheck) {
    proS["delete"](idcheck);
    location.reload();
}
// sự kiện thêm mới khi click vào nút thêm mới
function themMoi() {
    var name = document.getElementById('name');
    var id = document.getElementById('id');
    var price = document.getElementById('price');
    var pro1 = { name: name.value, id: parseInt(id.value), price: parseInt(price.value) };
    proS.create(pro1);
    location.reload();
}
