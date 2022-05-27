class Product {
    name: string;
    id:number;
    price:number;
}

interface CRUD {
    read(): void
    create(pro: Product): Boolean;
    

}

class ProductService implements CRUD {
    // thuộc tính
    product: Product[] = [];

    // phương thức khởi tạo
    constructor() {

        // kiểm tra trong localStorage có key là product ko 
        //có thì gán giá trị lấy được từ localStorage gán vào thuộc tính product ở trên
        // không thì gán mản rỗng cho nó
        if (localStorage.getItem('product')) {
            var data = localStorage.getItem('product');
            this.product = JSON.parse(data);
        } else {
            this.product = [];
        }

    }

    // phương thức thêm mới
    create(pro: Product): Boolean {
        // thêm phần tử vào mảng
        this.product.push(pro);
        // lưu vào localStorage với key là product 
        localStorage.setItem('product', JSON.stringify(this.product))
        return true;
    }
    // phương thức đọc để hiển thị ra màn hình
    read(): void {
        let _html = "";

        this.product.forEach((element, index) => {
            _html += ` <tr>
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.price}</td>
            <td><button onclick="deleteProduct(${element.id})">X</button></td>
            <td><button onclick="update(${element.id})">Update</button></td>
        </tr>`
        });
        document.getElementById('hung').innerHTML = _html;
    }
    delete(id : number){
        for (let key in this.product){
            if (this.product[key].id == id) {
                var keycheck = key;
            }
        }
        this.product.splice(parseInt(keycheck),1);
        localStorage.setItem('product', JSON.stringify(this.product));
        
    }
    // xóa
    /* delete(){
        // lấy về cái id hoặc key của phần tử tương ứng trong mảng mà muốn xóa
        sử dụng ví dụ
        

        
        this.product.splice(?, 1); // 2nd parameter means remove one item only

        // lưu vào localStorage
         localStorage.setItem('product', JSON.stringify(this.product))
    } */
}

// khởi tạo đối tượng proS từ class ProductService
var proS = new ProductService();
// gọi đến phương thức hiển thị danh sách ra màn ginhf
proS.read();

function deleteProduct(idcheck : number){
    proS.delete(idcheck);
    location.reload();    
}


// sự kiện thêm mới khi click vào nút thêm mới
function themMoi() {
    var name = document.getElementById('name') as HTMLInputElement;
    var id = document.getElementById('id') as HTMLInputElement;
    var price = document.getElementById('price') as HTMLInputElement;
    var pro1: Product = { name: name.value , id: parseInt(id.value) , price: parseInt(price.value) }   
    proS.create(pro1);    
    location.reload();
}

