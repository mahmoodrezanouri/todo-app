interface ValidationErrors {
    [key: string]: string[];
}

const validationService = {
    validateTodoForm: (description: string, deadline: Date | null): ValidationErrors => {
        const errors: ValidationErrors = {};

        if (!description.trim()) {
            errors.description = ['Description is required.'];
        } else if (description.length < 10) {
            errors.description = ['Description must be at least 10 characters.'];
        }

        if (!deadline) {
            errors.deadline = ['Deadline is required.'];
        }

        return errors;
    },
};

export default validationService;
