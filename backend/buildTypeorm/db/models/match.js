var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** @module Models/Match */
import { BaseEntity, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.js";
/**
 * Match model - This is for interacting with the Match table
 * Each Match corresponds to exactly 1 pet owned by a User.
 * This allows each user to have many pet Matchs without needing to create more accounts
 */
let Match = class Match extends BaseEntity {
    id;
    matcher;
    matchee; // The ! is Typescript's non-nullable operator and works like nullable: false above
    created_at;
    deleted_at;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Match.prototype, "id", void 0);
__decorate([
    ManyToOne((type) => Profile, (profile) => profile.matches, {
        //No sense having a match without a matchee, right?
        nullable: false,
        // if we delete a User, also delete their Messages
        onDelete: "CASCADE"
    }),
    __metadata("design:type", Object)
], Match.prototype, "matcher", void 0);
__decorate([
    ManyToOne((type) => Profile, (profile) => profile.matches, {
        // if we delete a User, also delete their Messages
        onDelete: "CASCADE"
    }),
    __metadata("design:type", Object)
], Match.prototype, "matchee", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", String)
], Match.prototype, "created_at", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", String)
], Match.prototype, "deleted_at", void 0);
Match = __decorate([
    Entity()
], Match);
export { Match };
export function MatchBuilder(matcher, matchee) {
    let myMatch = new Match();
    myMatch.matcher = matcher;
    myMatch.matchee = matchee;
    return myMatch;
}
/*
TINDER: you are Match1
when you swipe-right on another Match, say Match2
> Create a new Match row in the Match table and set its matching_Match to our user

if someone else swipes right on YOUR Match, again, Match1
> Create a new match row in the match table and set its matched_Match to our user

 */
//# sourceMappingURL=match.js.map