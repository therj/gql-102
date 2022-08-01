const { RESTDataSource } = require('apollo-datasource-rest');

class PostAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://jsonplaceholder.typicode.com';
  }
  async getPosts() {
    // return this.get('/posts')
    const posts = await this.get('/posts');
    return posts;
  }
  async getPostById(postId) {
    // return this.get('/posts')
    const posts = await this.get(`/posts/${postId}`);
    return posts;
  }
}

module.exports = { PostAPI };
