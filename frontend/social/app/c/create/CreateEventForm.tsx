"use client";

import React, {useState} from "react";
import {useForm, FormProvider} from "react-hook-form";

import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Box,
    Button,
    LinearProgress,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
    MenuItem,
} from "@mui/material";
import {WarningAmber, CheckCircle} from "@mui/icons-material";

// Step schemas
const stepSchemas = [
    z.object({
        location: z.string().min(2, "Location must be at least 2 characters."),
    }),
    z.object({
        activityType: z.enum([
            "Hiking",
            "Cooking",
            "Reading",
            "Gaming",
            "Swimming",
            "Coding",
            "Traveling",
            "Dancing",
            "Running",
            "Photography",
        ]),
    }),
    z.object({
        name: z
            .string()
            .min(3, "Name must be least 3 characters.")
            .max(25, "Name must be less than 25 characters."),
    }),
    z.object({
        description: z
            .string()
            .min(50, "Description must be at least 50 characters.")
            .max(250, "Description must be less than 250 characters."),
    }),
];

// Combined schema (optional if needed globally)
const schema = stepSchemas.reduce(
    (acc, schema) => acc.merge(schema),
    z.object({})
);

type FormValues = z.infer<typeof schema>;

const steps = ["Location", "Activity Type", "Group Name", "Description"];

const CreateEventForm: React.FC = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState<Partial<FormValues>>({});


    // Get the current schema and its inferred type
    const currentSchema = stepSchemas[step];
    type CurrentStepValues = z.infer<typeof currentSchema>;

    const methods = useForm<CurrentStepValues>({
        resolver: zodResolver(currentSchema), // Apply only the current step's schema
        defaultValues: {
            location: "",
            activityType: "",
            name: "",
            description: "",
        } as CurrentStepValues,
    });

    const onSubmit = (data: CurrentStepValues) => {
        setFormData((prev) => ({
            ...prev,
            ...data,
        }));

        if (step < steps.length - 1) {
            setStep((prev) => prev + 1); // Move to the next step
        } else {
            console.log("Final Data: ", {...formData, ...data}); // Log the complete form data
            // submit and see if the event can be created
            // TODO: submit data to backend
            // TODO: if submit fails, then return with form data still here...

            // clear the form state, clear component state, and reset to first step
            methods.reset(); // Reset the form state
            setFormData({}); // Clear the accumulated form data
            setStep(0); // Reset the stepper to the first step
        }
    };

    const goBack = () => {
        if (step > 0) setStep((prev) => prev - 1);
    };

    function getEnumOptions<T extends z.ZodRawShape>(schema: z.ZodObject<T>, fieldName: keyof T): string[] {
        const field = schema.shape[fieldName];
        if (field instanceof z.ZodEnum) {
            return field.options;
        }
        return [];
    }

    return (
        <FormProvider {...methods}>
            <Box sx={{width: "100%", maxWidth: 600, mx: "auto", mt: 4}}>
                {/* Step Progress */}
                <Stepper activeStep={step} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {/* Step Bar */}
                <Box sx={{mt: 2}}>
                    <Typography variant="h6" textAlign="center">
                        Step {step + 1} of {steps.length}
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={((step + 1) / steps.length) * 100}
                        sx={{mt: 1}}
                    />
                </Box>

                {/* Form */}
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Box sx={{mt: 4}}>
                        {step === 0 && (
                            <TextField
                                {...methods.register("location" as keyof CurrentStepValues)}
                                label="Location"
                                fullWidth
                                error={!!methods.formState["location" as keyof CurrentStepValues]}
                            />
                        )}

                        {step === 1 && (
                            <TextField
                                select
                                {...methods.register("activityType" as keyof CurrentStepValues)}
                                label="Activity Type"
                                fullWidth
                                error={!!methods.formState["activityType" as keyof CurrentStepValues]}
                            >
                                {/* MAP activityType fields*/}
                                {getEnumOptions(stepSchemas[1] as z.ZodObject<any>, "activityType").map((activity) => (
                                    <MenuItem key={activity} value={activity}>
                                        {activity}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}

                        {step === 2 && (
                            <Box>
                                <TextField
                                    {...methods.register("name" as keyof CurrentStepValues)}
                                    label="Group Name"
                                    fullWidth
                                    error={!!methods.formState["name" as keyof CurrentStepValues]}
                                />
                                <Box sx={{display: "flex", alignItems: "center", mt: 1}}>
                                    {methods.watch("name")?.length >= 3 && methods.watch("name")?.length <= 25 ? (
                                        <CheckCircle color="success"/>
                                    ) : (
                                        <WarningAmber color="warning"/>
                                    )}
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            ml: 1,
                                            color: (methods.watch("name")?.length >= 3 && methods.watch("name")?.length <= 25) ? "green" : "orange",
                                        }}
                                    >
                                        {methods.watch("name")?.length || 0} characters (min=3, max=25) .
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        {step === 3 && (
                            <Box>
                                <TextField
                                    {...methods.register("description" as keyof CurrentStepValues)}
                                    label="Description"
                                    fullWidth
                                    multiline
                                    rows={5}
                                    error={!!methods.formState["description" as keyof CurrentStepValues]}
                                />
                                <Box sx={{display: "flex", alignItems: "center", mt: 1}}>
                                    {methods.watch("description")?.length >= 50 && methods.watch("description")?.length <= 250 ? (
                                        <CheckCircle color="success"/>
                                    ) : (
                                        <WarningAmber color="warning"/>
                                    )}
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            ml: 1,
                                            color: (methods.watch("description")?.length >= 50 && methods.watch("description")?.length <= 250) ? "green" : "orange",
                                        }}
                                    >
                                        {methods.watch("description")?.length || 0} characters (min=25, max=250)
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </Box>

                    {/* Navigation Buttons */}
                    <Box sx={{display: "flex", justifyContent: "space-between", mt: 4}}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={goBack}
                            disabled={step === 0}
                        >
                            Back
                        </Button>
                        <Button variant="contained" color="primary" type="submit">
                            {step === steps.length - 1 ? "Submit" : "Next"}
                        </Button>
                    </Box>
                </form>
            </Box>
        </FormProvider>
    );
};

export default CreateEventForm;
