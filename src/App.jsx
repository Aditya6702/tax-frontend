"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSun, FaMoon } from "react-icons/fa";
import "@/components/ui/loading.css";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  grossSalary: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .nonnegative({ message: "Gross Salary must be a positive number." })
  ),
  city: z.string().nonempty({ message: "City is required." }),
  state: z.string().nonempty({ message: "State is required." }),
  ageGroup: z.enum(["0-60", "60-80", "80+"], {
    message: "Age group is required.",
  }),
  investmentRisk: z.enum(["Low", "Medium", "High"], {
    message: "Investment risk is required.",
  }),
  monthlyRent: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .nonnegative({ message: "Monthly Rent must be a positive number." })
  ),
  pension: z.preprocess(
    (val) => Number(val),
    z.number().nonnegative({ message: "Pension must be a positive number." })
  ),
  investmentSpecific: z
    .string()
    .nonempty({ message: "Investment Specific is required." }),
  financialCondition: z
    .string()
    .nonempty({ message: "Financial Condition is required." }),
});

export default function TaxForm() {
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    toast({
      description: "Form submitted successfully!",
    });
    console.log("Form Data:", data);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    
    console.log("Form Data: submitted");
    // Handle the form submission
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <div
      className={`min-h-screen p-10 flex flex-col items-center ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      } text-gray-800 dark:text-gray-200 relative`}
    >
      <Button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 p-2 rounded-full border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg"
      >
        {darkMode ? (
          <FaSun className="text-yellow-400" />
        ) : (
          <FaMoon className="text-gray-700" />
        )}
      </Button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg space-y-4 max-w-full w-full md:w-4/5 lg:w-3/4 xl:w-2/3 shadow-md`}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Taxes Form</h1>
        <div>
          <label htmlFor="name" className="block text-lg font-medium mb-2">
            Name
          </label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                id="name"
                placeholder="Name"
                {...field}
                className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-md p-2"
              />
            )}
          />
          {errors.name && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.name.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="grossSalary"
            className="block text-lg font-medium mb-2"
          >
            Gross Salary
          </label>
          <Controller
            name="grossSalary"
            control={control}
            render={({ field }) => (
              <Input
                id="grossSalary"
                placeholder="Gross Salary"
                type="number"
                {...field}
                className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-md p-2"
              />
            )}
          />
          {errors.grossSalary && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.grossSalary.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="city" className="block text-lg font-medium mb-2">
            City
          </label>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Input
                id="city"
                placeholder="City"
                {...field}
                className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-md p-2"
              />
            )}
          />
          {errors.city && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.city.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="state" className="block text-lg font-medium mb-2">
            State
          </label>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Input
                id="state"
                placeholder="State"
                {...field}
                className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-md p-2"
              />
            )}
          />
          {errors.state && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.state.message}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label
              htmlFor="ageGroup"
              className="block text-lg font-medium mb-2"
            >
              Age Group
            </label>
            <Controller
              name="ageGroup"
              control={control}
              render={({ field }) => (
                <select
                  id="ageGroup"
                  {...field}
                  className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full"
                >
                  <option value="">Select Age Group</option>
                  <option value="0-60">0-60</option>
                  <option value="60-80">60-80</option>
                  <option value="80+">80+</option>
                </select>
              )}
            />
            {errors.ageGroup && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.ageGroup.message}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-[200px]">
            <label
              htmlFor="investmentRisk"
              className="block text-lg font-medium mb-2"
            >
              Investment Risk
            </label>
            <Controller
              name="investmentRisk"
              control={control}
              render={({ field }) => (
                <select
                  id="investmentRisk"
                  {...field}
                  className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full"
                >
                  <option value="">Select Investment Risk</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              )}
            />
            {errors.investmentRisk && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.investmentRisk.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="monthlyRent"
            className="block text-lg font-medium mb-2"
          >
            Monthly Rent
          </label>
          <Controller
            name="monthlyRent"
            control={control}
            render={({ field }) => (
              <Input
                id="monthlyRent"
                placeholder="Monthly Rent"
                type="number"
                {...field}
                className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-md p-2"
              />
            )}
          />
          {errors.monthlyRent && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.monthlyRent.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="pension" className="block text-lg font-medium mb-2">
            Pension
          </label>
          <Controller
            name="pension"
            control={control}
            render={({ field }) => (
              <Input
                id="pension"
                placeholder="Pension"
                type="number"
                {...field}
                className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-md p-2"
              />
            )}
          />
          {errors.pension && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.pension.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="investmentSpecific"
            className="block text-lg font-medium mb-2"
          >
            Investment Specific
          </label>
          <Controller
            name="investmentSpecific"
            control={control}
            render={({ field }) => (
              <Input
                id="investmentSpecific"
                placeholder="Investment Specific"
                {...field}
                className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-md p-2"
              />
            )}
          />
          {errors.investmentSpecific && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.investmentSpecific.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="financialCondition"
            className="block text-lg font-medium mb-2"
          >
            Financial Condition
          </label>
          <Controller
            name="financialCondition"
            control={control}
            render={({ field }) => (
              <Input
                id="financialCondition"
                placeholder="Financial Condition"
                {...field}
                className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-md p-2"
              />
            )}
          />
          {errors.financialCondition && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.financialCondition.message}
            </span>
          )}
        </div>
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white border border-blue-600 rounded-md p-2 w-full"
        >
          {isLoading ? <div class="loader"></div> : <div>Submit</div>}
        </Button>
      </form>
      <Toaster />
    </div>
  );
}
