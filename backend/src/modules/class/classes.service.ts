import {Injectable, NotAcceptableException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {Classes, ClassesFillableFields} from './classes.entity';
import {ClassesPayload} from 'modules/auth/classes.payload';
import {updateExpression} from '@babel/types';

@Injectable()
export class ClassesService {

    constructor(
        @InjectRepository(Classes)
        private readonly classesRepository: Repository<Classes>,
    ) {
    }

    async get(id_class: number) {
        return this.classesRepository.findOne(id_class);
    }

    async getAll() {
        return this.classesRepository.query('SELECT * FROM classes');
    }

    async getByName(name: string) {
        return await this.classesRepository.createQueryBuilder('classes')
            .where('classes.name = :name')
            .setParameter('name', name)
            .getOne();
    }

    async update(payload: ClassesPayload) {
        return this.classesRepository.save(payload);
    }

    async create(
        payload: ClassesPayload,
    ) {
        const classes = await this.getByName(payload.name);

        if (classes) {
            throw new NotAcceptableException(
                'This class has already been added.',
            );
        }

        return await this.classesRepository.save(
            this.classesRepository.create(payload),
        );
    }

    async remove(
        payload: ClassesPayload,
    ) {
        const classes = await this.getByName(payload.name);

        if (!classes) {
            throw new NotAcceptableException(
                'This class does not exist. Cannot remove.',
            );
        }

        return await this.classesRepository.delete(payload);
    }

}
