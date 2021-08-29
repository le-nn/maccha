export enum PostStatusType {
    Drafting,
    Public,
    Private
}
export const postStatusTypes = [
    { display: "公開", value: PostStatusType.Public },
    { display: "限定公開", value: PostStatusType.Private },
    { display: "下書き保存", value: PostStatusType.Drafting }
];

export const postStatusTypeDisplay = postStatusTypes.reduce(
    (x, y) => ({ ...x, ...{ [y.value]: y.display } }),
    {} as { [key: number]: string }
);