// modify types in here as necessary

type ArticleType = "article" | "announcement" | "poll" | "event"

interface BlogType {
    id: number;
    Title: string;
    Datetime: string;
    AuthorName: string;
    AuthorYearGroup: string;
    AuthorHouse: string;
    Body: string;
    Subtitle: string | null;
}

interface TagsType {
    Tags: string;
}

export type { ArticleType, BlogType, TagsType }