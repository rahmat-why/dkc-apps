import { Sequelize } from "sequelize";
import connection from '../config/db.config.js'

export const AreaCoordinator = connection.define('area_coordinator', {
    coordinator_id: {
        primaryKey: true,
        type: Sequelize.STRING,
    },
    name: Sequelize.STRING,
    nta: Sequelize.STRING,
    image: Sequelize.STRING,
    area_id: Sequelize.STRING
});

export const getAll = () => {
    const area_coordinator = AreaCoordinator.findAll()

    return area_coordinator;
}

export const store = (name, nta, image, area_id) => {
    const coordinator_id = "COR"+Math.random();
    const store = AreaCoordinator.create({
        coordinator_id: coordinator_id,
        name: name,
        nta: nta,
        image: image,
        area_id: area_id,
    })
    
    return store;
}

export const destroy = (coordinator_id) => {
    const destroy = AreaCoordinator.destroy({
        where: {
            coordinator_id: coordinator_id
        }
    });

    return destroy
}