import { Router } from 'express';
import { TopicController } from '../controllers/topic.controller';
import { CreateTopicUseCase } from '../../application/usecases/createTopic.usecase';
import { GetTopicUseCase } from '../../application/usecases/getTopic.usecase';
import { UpdateTopicUseCase } from '../../application/usecases/updateTopic.usecase';
import { DeleteTopicUseCase } from '../../application/usecases/deleteTopic.usecase';
import { MongooseTopicRepository } from '../repositories/mongooseTopic.repository';
import authMiddleware from '../../../auth/infrastructure/middlewares/auth.middleware';

const topicRepository = new MongooseTopicRepository();

const createTopicUseCase = new CreateTopicUseCase(topicRepository);
const getTopicUseCase = new GetTopicUseCase(topicRepository);
const updateTopicUseCase = new UpdateTopicUseCase(topicRepository);
const deleteTopicUseCase = new DeleteTopicUseCase(topicRepository);

const topicController = new TopicController(
  createTopicUseCase,
  getTopicUseCase,
  updateTopicUseCase,
  deleteTopicUseCase
);

const router = Router();

// Ruta de búsqueda, debe ir antes de la ruta que maneja `/:id`
router.get('/search', authMiddleware, (req, res) => {
  /*  #swagger.tags = ['Topics']
      #swagger.summary = 'Search topics by term'
      #swagger.description = 'Retrieves a list of topics that match the search term.'
      #swagger.parameters['term'] = {
          in: 'query',
          description: 'The term to search for topics',
          required: true,
          type: 'string'
      }
      #swagger.responses[200] = {
          description: 'List of matching topics retrieved successfully',
          schema: [
              {
                  id: 'topic_id_1',
                  name: 'Topic 1',
                  description: 'Description of Topic 1'
              }
          ]
      }
      #swagger.responses[400] = {
          description: 'Bad request, validation failed'
      }
  */
  topicController.search(req, res);
});

// Las demás rutas
router.post('/', authMiddleware, (req, res) => {
  /*  #swagger.tags = ['Topics']
      #swagger.summary = 'Create a new topic'
      #swagger.description = 'Creates a new topic with the given details.'
      #swagger.parameters['body'] = {
          in: 'body',
          description: 'Topic creation details',
          required: true,
          schema: { $ref: '#/definitions/CreateTopicDTO' }
      }
      #swagger.responses[201] = {
          description: 'Topic created successfully',
          schema: {
              success: true,
              message: 'Topic created successfully'
          }
      }
      #swagger.responses[400] = {
          description: 'Bad request, validation failed'
      }
  */
  topicController.create(req, res);
});

router.get('/', authMiddleware, (req, res) => {
  /*  #swagger.tags = ['Topics']
      #swagger.summary = 'Get all topics'
      #swagger.description = 'Retrieves a list of all topics.'
      #swagger.responses[200] = {
          description: 'List of topics retrieved successfully',
          schema: [
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
  */
  topicController.getAll(req, res);
});

router.get('/:id', authMiddleware, (req, res) => {
  /*  #swagger.tags = ['Topics']
      #swagger.summary = 'Get a topic by ID'
      #swagger.description = 'Retrieves a topic by its ID.'
      #swagger.parameters['id'] = {
          in: 'path',
          description: 'The ID of the topic to retrieve',
          required: true,
          type: 'string'
      }
      #swagger.responses[200] = {
          description: 'Topic retrieved successfully',
          schema: {
              id: 'topic_id_1',
              name: 'Topic 1',
              description: 'Description of Topic 1'
          }
      }
      #swagger.responses[404] = {
          description: 'Topic not found'
      }
  */
  topicController.get(req, res);
});


export default router;
