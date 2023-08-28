import { faker } from "@faker-js/faker";
import Boom from "@hapi/boom";

class productService {
  constructor() {
    this.product = [];
    this.generate();
  }

  //generar 100 productos aleatorios
  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.product.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  find() {
    return this.product;
  }

  async findOne(id) {
    const product = this.product.find((item) => item.id === id);
    if (!product) {
      throw Boom.notFound("product not found");
    }
    if (product.isBlock) {
      throw Boom.conflict("product is block");
    } else {
      return product;
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.string.nanoid(),
      ...data,
    };
    this.product.push(newProduct);
    return newProduct;
  }

  //para actualizaR EL PRODUCTO
  async update(id, changes) {
    const index = this.product.findIndex((item) => item.id === id);
    if (index === -1) {
      throw Boom.notFound("product not found");
    }
    const product = this.product[index];
    this.product[index] = {
      ...product,
      ...changes,
    };
    return this.product[index];
  }

  //para eliminar
  delete() {
    const index = this.product.findIndex((item) => item.id === id);
    if (index === -1) {
      throw Boom.notFound("Id not found");
    }
    this.product.splice(index, 1);
    return { id };
  }
}

export default productService;
