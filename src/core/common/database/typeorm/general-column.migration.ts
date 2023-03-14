export const idColumn = [
    {
        name: "id",
        type: "varchar",
        length: "16",
        isUnique: true,
        isNullable: false,
        isPrimary: true,
    }
]

export function dateColumn(deletedAt = true) {
    const columns = [
        {
            name: "created_at",
            type: "timestamp",
            isNullable: true,
            default: "now()",
        },
        {
            name: "updated_at",
            type: "timestamp",
            isNullable: true,
            default: "now()",
        },
    ];

    if (deletedAt) {
        columns.push({
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
            default: null,
        });
    }
    
    return columns;
}