import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { CreateCategoryUseCase } from '../../application/usecases/createCategory.usecase';
import { GetCategoryUseCase } from '../../application/usecases/getCategory.usecase';

import { MongooseCategoryRepository } from '../repositories/mongooseCategory.repository';
import authMiddleware from '../../../auth/infrastructure/middlewares/auth.middleware';

const categoryRepository = new MongooseCategoryRepository();

const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
const getCategoryUseCase = new GetCategoryUseCase(categoryRepository);

const categoryController = new CategoryController(
  createCategoryUseCase,
  getCategoryUseCase,
);

const router = Router();

// Ruta de búsqueda, debe ir antes de la ruta que maneja `/:id`
router.get('/search', authMiddleware, (req, res) => {
  /*  #swagger.tags = ['Categories']
      #swagger.summary = 'Search categorys by term'
      #swagger.description = 'Retrieves a list of categorys that match the search term.'
      #swagger.parameters['term'] = {
          in: 'query',
          description: 'The term to search for categorys',
          required: true,
          type: 'string'
      }
      #swagger.responses[200] = {
          description: 'List of matching categorys retrieved successfully',
          schema: [
              {
                  id: 'category_id_1',
                  name: 'Category 1',
                  description: 'Description of Category 1'
              }
          ]
      }
      #swagger.responses[400] = {
          description: 'Bad request, validation failed'
      }
  */
  categoryController.search(req, res);
});

// Las demás rutas
router.post('/', authMiddleware, (req, res) => {
  /*  #swagger.tags = ['Categories']
      #swagger.summary = 'Create a new category'
      #swagger.description = 'Creates a new category with the given details.'
      #swagger.parameters['body'] = {
          in: 'body',
          description: 'Category creation details',
          required: true,
          schema: { $ref: '#/definitions/CreateCategoryDTO' }
      }
      #swagger.responses[201] = {
          description: 'Category created successfully',
          schema: {
              success: true,
              message: 'Category created successfully'
          }
      }
      #swagger.responses[400] = {
          description: 'Bad request, validation failed'
      }
  */
  categoryController.create(req, res);
});

router.get('/', authMiddleware, (req, res) => {
  /*  #swagger.tags = ['Categories']
      #swagger.summary = 'Get all categorys'
      #swagger.description = 'Retrieves a list of all categorys.'
      #swagger.responses[200] = {
          description: 'List of categorys retrieved successfully',
          schema: [
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
  */
  categoryController.getAll(req, res);
});

router.get('/:id', authMiddleware, (req, res) => {
  /*  #swagger.tags = ['Categories']
      #swagger.summary = 'Get a category by ID'
      #swagger.description = 'Retrieves a category by its ID.'
      #swagger.parameters['id'] = {
          in: 'path',
          description: 'The ID of the category to retrieve',
          required: true,
          type: 'string'
      }
      #swagger.responses[200] = {
          description: 'Category retrieved successfully',
          schema: {
              id: 'category_id_1',
              name: 'Category 1',
              description: 'Description of Category 1'
          }
      }
      #swagger.responses[404] = {
          description: 'Category not found'
      }
  */
  categoryController.get(req, res);
});



export default router;
