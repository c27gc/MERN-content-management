import swaggerAutogen from 'swagger-autogen';

const port = process.env.PORT || 5000;
const host = `localhost:${port}`;

const swaggerOptions = {
  swagger: '2.0',
  info: {
    title: 'MERN API',
    description: 'API documentation for the MERN application',
    version: '1.0.0',
  },
  host: host,
  basePath: '/api',
  schemes: ['http'],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"'
    }
  },
  security: [{ Bearer: [] }],
  paths: {
    '/register': {
      post: {
        summary: 'Register a new user',
        description: 'Register a new user by providing the necessary details.',
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'User registration details',
            required: true,
            schema: {
              $ref: '#/definitions/RegisterUserDTO'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Successful registration',
            examples: {
              'application/json': {
                success: true,
                message: 'User registered successfully'
              }
            }
          }
        }
      }
    },
    '/login': {
      post: {
        summary: 'User login',
        description: 'Login a user with their email and password.',
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'User login details',
            required: true,
            schema: {
              $ref: '#/definitions/LoginUserDTO'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Successful login',
            examples: {
              'application/json': {
                success: true,
                token: 'jwt_token_here'
              }
            }
          }
        }
      }
    },
    '/role': {
      get: {
        summary: 'Get user role',
        description: 'Retrieve the role of the user based on the provided token.',
        security: [{ Bearer: [] }],
        parameters: [
          {
            in: 'header',
            name: 'Authorization',
            description: 'JWT token for authentication',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'Role retrieved successfully',
            schema: {
              role: 'Creador' // Ejemplo de rol
            }
          },
          '401': {
            description: 'Unauthorized, token not provided or invalid'
          },
          '400': {
            description: 'Bad request, validation failed'
          }
        }
      }
    },
    '/categories': {
      post: {
        summary: 'Create a new category',
        description: 'Creates a new category with the given details.',
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Category creation details',
            required: true,
            schema: {
              $ref: '#/definitions/CreateCategoryDTO'
            }
          }
        ],
        responses: {
          '201': {
            description: 'Category created successfully',
            examples: {
              'application/json': {
                success: true,
                message: 'Category created successfully'
              }
            }
          },
          '400': {
            description: 'Bad request, validation failed'
          }
        }
      },
      get: {
        summary: 'Get all categories',
        description: 'Retrieves a list of all categories.',
        responses: {
          '200': {
            description: 'List of categories retrieved successfully',
            examples: {
              'application/json': [
                {
                  id: 'category_id_1',
                  name: 'Category 1',
                  description: 'Description of Category 1'
                },
                {
                  id: 'category_id_2',
                  name: 'Category 2',
                  description: 'Description of Category 2'
                }
              ]
            }
          }
        }
      }
    },
    '/categories/{id}': {
      get: {
        summary: 'Get a category by ID',
        description: 'Retrieves a category by its ID.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'The ID of the category to retrieve',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Category retrieved successfully',
            examples: {
              'application/json': {
                id: 'category_id_1',
                name: 'Category 1',
                description: 'Description of Category 1'
              }
            }
          },
          '404': {
            description: 'Category not found'
          }
        }
      }
    },
    '/categories/search': {
      get: {
        summary: 'Search categories by term',
        description: 'Retrieves a list of categories that match the search term.',
        parameters: [
          {
            in: 'query',
            name: 'term',
            description: 'The term to search for categories',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'List of matching categories retrieved successfully',
            examples: {
              'application/json': [
                {
                  id: 'category_id_1',
                  name: 'Category 1',
                  description: 'Description of Category 1'
                }
              ]
            }
          },
          '400': {
            description: 'Bad request, validation failed'
          }
        }
      }
    },
    '/topics': {
      post: {
        summary: 'Create a new topic',
        description: 'Creates a new topic with the given details.',
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Topic creation details',
            required: true,
            schema: {
              $ref: '#/definitions/CreateTopicDTO'
            }
          }
        ],
        responses: {
          '201': {
            description: 'Topic created successfully',
            examples: {
              'application/json': {
                success: true,
                message: 'Topic created successfully'
              }
            }
          },
          '400': {
            description: 'Bad request, validation failed'
          }
        }
      },
      get: {
        summary: 'Get all topics',
        description: 'Retrieves a list of all topics.',
        responses: {
          '200': {
            description: 'List of topics retrieved successfully',
            examples: {
              'application/json': [
                {
                  id: 'topic_id_1',
                  name: 'Topic 1',
                  description: 'Description of Topic 1'
                },
                {
                  id: 'topic_id_2',
                  name: 'Topic 2',
                  description: 'Description of Topic 2'
                }
              ]
            }
          }
        }
      }
    },
    '/topics/{id}': {
      get: {
        summary: 'Get a topic by ID',
        description: 'Retrieves a topic by its ID.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'The ID of the topic to retrieve',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Topic retrieved successfully',
            examples: {
              'application/json': {
                id: 'topic_id_1',
                name: 'Topic 1',
                description: 'Description of Topic 1'
              }
            }
          },
          '404': {
            description: 'Topic not found'
          }
        }
      },
      put: {
        summary: 'Update a topic',
        description: 'Updates a topic with the given ID.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'The ID of the topic to update',
            required: true,
            schema: {
              type: 'string'
            }
          },
          {
            in: 'body',
            name: 'body',
            description: 'Topic update details',
            required: true,
            schema: {
              $ref: '#/definitions/UpdateTopicDTO'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Topic updated successfully',
            examples: {
              'application/json': {
                success: true,
                message: 'Topic updated successfully'
              }
            }
          },
          '400': {
            description: 'Bad request, validation failed'
          },
          '404': {
            description: 'Topic not found'
          }
        }
      },
      delete: {
        summary: 'Delete a topic',
        description: 'Deletes a topic by its ID.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'The ID of the topic to delete',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '204': {
            description: 'Topic deleted successfully'
          },
          '404': {
            description: 'Topic not found'
          }
        }
      }
    },
    '/topics/search': {
      get: {
        summary: 'Search topics by term',
        description: 'Retrieves a list of topics that match the search term.',
        parameters: [
          {
            in: 'query',
            name: 'term',
            description: 'The term to search for topics',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'List of matching topics retrieved successfully',
            examples: {
              'application/json': [
                {
                  id: 'topic_id_1',
                  name: 'Topic 1',
                  description: 'Description of Topic 1'
                }
              ]
            }
          },
          '400': {
            description: 'Bad request, validation failed'
          }
        }
      }
    }
  },
  definitions: {
    RegisterUserDTO: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        role: { type: 'string' }
      },
      required: ['username', 'email', 'password', 'role'],
      example: {
        username: 'exampleuser',
        email: 'user@example.com',
        password: 'password123',
        role: 'user'
      }
    },
    LoginUserDTO: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' }
      },
      required: ['email', 'password'],
      example: {
        email: 'user@example.com',
        password: 'password123'
      }
    },
    CreateCategoryDTO: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' }
      },
      required: ['name', 'description'],
      example: {
        name: 'Youtube',
        description: 'Content from Youtube.'
      }
    },
    CreateTopicDTO: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        coverImage: { type: 'string' },
        allowedContentTypes: { type: 'array', items: { type: 'string' } }
      },
      required: ['name', 'description', 'coverImage', 'allowedContentTypes'],
      example: {
        name: 'Technology',
        description: 'All about tech.',
        coverImage: 'http://example.com/cover.jpg',
        allowedContentTypes: ['image', 'video', 'text']
      }
    },
    UpdateTopicDTO: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        coverImage: { type: 'string' },
        allowedContentTypes: { type: 'array', items: { type: 'string' } }
      },
      required: ['name', 'description', 'coverImage', 'allowedContentTypes'],
      example: {
        name: 'Science',
        description: 'Updated description for science.',
        coverImage: 'http://example.com/newcover.jpg',
        allowedContentTypes: ['image', 'video']
      }
    }
  }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['../src/index.ts'];

swaggerAutogen()(outputFile, endpointsFiles, swaggerOptions).then(() => {
  console.log('Swagger documentation generated');
  process.exit();
});
