import { Injectable, HttpException } from '@nestjs/common';
import { SUBSCRIBERS } from 'src/fakedb/subscribers.fakedb';

@Injectable()
export class SubscribersService {
    subscribers = SUBSCRIBERS;

    getAllSubscribers(): Promise<any>{
        return new Promise(resolve => {
            resolve(this.subscribers);
        })
    }

    getSubscriberById(userId): Promise<any> {
        //let id = Number(userId)
        return new Promise(resolve => {
            const subscriber = this.subscribers.find(subscriber => subscriber.id === userId);
              if (!subscriber) {
                  throw new HttpException('Book does not exist!', 404);
              }
              resolve(subscriber);
        })
    }
    
    addSubscriber(subscriber): Promise<any>{
        return new  Promise(resolve => {
            this.subscribers.push(subscriber);
            resolve(this.subscribers);
        })
    }

    deleteSubscriber(subscriberId): Promise<any>{
        //let id = Number(subscriberId);
        return new Promise(resolve => {
            let index = this.subscribers.findIndex(payment => payment.id === subscriberId);
            if (index === -1){
                throw new  HttpException('No such subscriber', subscriberId);
            }
            this.subscribers.splice(1, index);
            resolve(this.subscribers);
        })
    }
}
