import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './modules/person/person.module';
import { PersonController } from './controllers/person/person.controller';
import { PersonService } from './services/person/person.service';

@Module({
  imports: [PersonModule],
  controllers: [AppController, PersonController],
  providers: [AppService, PersonService],
})
export class AppModule {}
