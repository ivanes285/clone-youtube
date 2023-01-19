export interface IVideo {
    _id: string;
    userId: string;
    title: string;
    desc: string;
    imgUrl: string;
    views: number;
    tags: string[];
    likes: string[];
    dislikes: string[];
    createdAt: Date;
    updatedAt: Date;

}