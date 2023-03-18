var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** @module Models/Message */
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.js";
/**
 * Message model - This is for interacting with the message table
 * Each message consists of a sender, a recipient, and a message.
 * Senders and recipients are users.
 */
let Message = class Message extends BaseEntity {
    id;
    sender;
    recipient;
    message;
    created_at;
    // "Soft-delete" by setting time of "deletion"
    deleted_at;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Message.prototype, "id", void 0);
__decorate([
    ManyToOne((type) => User, (sender) => sender.sent, {
        // Create a user if you start with a message
        cascade: ["insert"],
        // if we delete a User, also delete their Messages
        onDelete: "CASCADE"
    }),
    __metadata("design:type", Object)
], Message.prototype, "sender", void 0);
__decorate([
    ManyToOne((type) => User, (recipient) => recipient.inbox, {
        // Create a user if you start with a Message
        cascade: ["insert"],
        // if we delete a User, also delete their Messages
        onDelete: "CASCADE"
    }),
    __metadata("design:type", Object)
], Message.prototype, "recipient", void 0);
__decorate([
    Column('text'),
    __metadata("design:type", String)
], Message.prototype, "message", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", String)
], Message.prototype, "created_at", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", String)
], Message.prototype, "deleted_at", void 0);
Message = __decorate([
    Entity()
], Message);
export { Message };
/*
TINDER: you are profile1
when you swipe-right on another profile, say profile2
> Create a new Message row in the Message table and set its matching_profile to our user

if someone else swipes right on YOUR profile, again, profile1
> Create a new match row in the match table and set its matched_Profile to our user

 */
//# sourceMappingURL=message.js.map