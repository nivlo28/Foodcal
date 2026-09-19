import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

export type MealType =
  | 'Desayuno'
  | 'Almuerzo'
  | 'Merienda'
  | 'Cena';

export type Food = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: MealType;
  date: string;
  image?: string;
};

export type WaterEntry = {
  id: string;
  amount: number;
  date: string;
};

type AddFoodData = {
  name: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  mealType: MealType;
  image?: string;
};

type FoodContextType = {
  foods: Food[];

  profile: Record<string, any>;

  updateWeight: (weight: number) => void;

  calorieGoal: number;
  proteinGoal: number;
  waterGoal: number;

  selectedDate: Date;
  setSelectedDate: (date: Date) => void;

  selectedDayFoods: Food[];

  addFood: (data: AddFoodData) => void;
  removeFood: (id: string) => void;

  totalCalories: number;
  selectedDayCalories: number;

  selectedDayProtein: number;
  selectedDayCarbs: number;
  selectedDayFat: number;

  waterEntries: WaterEntry[];
  selectedDayWater: number;

  addWater: (amount: number) => void;
  removeWater: (id: string) => void;
};
const FoodContext =
  createContext<FoodContextType | undefined>(
    undefined
  );

type FoodProviderProps = {
  children: ReactNode;
};

export function FoodProvider({
  children,
}: FoodProviderProps) {
  const [foods, setFoods] = useState<Food[]>(
    []
  );

  const [waterEntries, setWaterEntries] =
    useState<WaterEntry[]>([]);

  const [selectedDate, setSelectedDate] =
    useState(new Date());

   const [profile, setProfile] = useState({
    name: '',
    age: 18,
    height: 175,
    weight: 153.3,
    targetWeight: 150
   });

   const updateWeight = (weight: number) => {
  setProfile((currentProfile) => ({
    ...currentProfile,
    weight,
  }));
  };

   const calorieGoal = 2400;
   const proteinGoal = 180;
   const waterGoal = 2500;

  // =========================
  // COMIDAS
  // =========================

  const addFood = (data: AddFoodData) => {
    const newFood: Food = {
      id:
        Date.now().toString(),
      name: data.name,
      calories: data.calories,
      protein: data.protein ?? 0,
      carbs: data.carbs ?? 0,
      fat: data.fat ?? 0,
      mealType: data.mealType,
      date:
        new Date().toISOString(),
      image: data.image,
    };

    setFoods((currentFoods) => [
      ...currentFoods,
      newFood,
    ]);
  };

  const removeFood = (id: string) => {
    setFoods((currentFoods) =>
      currentFoods.filter(
        (food) => food.id !== id
      )
    );
  };

  // =========================
  // FECHAS
  // =========================

  const isSameDay = (
    date1: Date,
    date2: Date
  ) => {
    return (
      date1.getFullYear() ===
        date2.getFullYear() &&
      date1.getMonth() ===
        date2.getMonth() &&
      date1.getDate() ===
        date2.getDate()
    );
  };

  // =========================
  // COMIDAS DEL DÍA
  // =========================

  const selectedDayFoods =
    foods.filter((food) =>
      isSameDay(
        new Date(food.date),
        selectedDate
      )
    );

  const selectedDayCalories =
    selectedDayFoods.reduce(
      (total, food) =>
        total + food.calories,
      0
    );

  const selectedDayProtein =
    selectedDayFoods.reduce(
      (total, food) =>
        total + food.protein,
      0
    );

  const selectedDayCarbs =
    selectedDayFoods.reduce(
      (total, food) =>
        total + food.carbs,
      0
    );

  const selectedDayFat =
    selectedDayFoods.reduce(
      (total, food) =>
        total + food.fat,
      0
    );

  const totalCalories =
    foods.reduce(
      (total, food) =>
        total + food.calories,
      0
    );

  // =========================
  // AGUA
  // =========================

  const addWater = (
    amount: number
  ) => {
    if (amount <= 0) {
      return;
    }

    const newWaterEntry: WaterEntry =
      {
        id:
          Date.now().toString(),
        amount,
        date:
          new Date().toISOString(),
      };

    setWaterEntries(
      (currentEntries) => [
        ...currentEntries,
        newWaterEntry,
      ]
    );
  };

  const removeWater = (
    id: string
  ) => {
    setWaterEntries(
      (currentEntries) =>
        currentEntries.filter(
          (entry) =>
            entry.id !== id
        )
    );
  };

  const selectedDayWater =
    waterEntries
      .filter((entry) =>
        isSameDay(
          new Date(entry.date),
          selectedDate
        )
      )
      .reduce(
        (total, entry) =>
          total + entry.amount,
        0
      );

  // =========================
  // PROVIDER
  // =========================

  return (
    <FoodContext.Provider
      value={{
  foods,

  profile,
  updateWeight,
  calorieGoal,
  proteinGoal,
  waterGoal,

  selectedDate,
  setSelectedDate,

  selectedDayFoods,

  addFood,
  removeFood,

  totalCalories,
  selectedDayCalories,

  selectedDayProtein,
  selectedDayCarbs,
  selectedDayFat,

  waterEntries,
  selectedDayWater,

  addWater,
  removeWater,
}}
    >
      {children}
    </FoodContext.Provider>
  );
}

export function useFood() {
  const context =
    useContext(FoodContext);

  if (!context) {
    throw new Error(
      'useFood debe utilizarse dentro de FoodProvider'
    );
  }

  return context;
}