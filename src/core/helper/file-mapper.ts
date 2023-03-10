export const fileMapper = (file: string, request: any) => {
    const url = `${request.protocol}://${request.headers.host}/${file}`;

    return {
        file,
        url,
    };
};

export const filesMapper = (files: Array<string>, request: any) => {
    return files.map((file) => {
        const url = `${request.protocol}://${request.headers.host}/${file}`;

        return {
            file: file,
            url,
        };
    });
};

export const imageFileFilter = (
    req: any,
    file: any,
    callback: (arg0: any, arg1: boolean) => void
  ) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }

    callback(null, true);
};