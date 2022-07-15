import 'package:flutter/material.dart';

import '../models/meal.dart';
import '../components/meal_item.dart';

class MealsScreenArguments {
  final String categoryTitle;
  final String categoryId;

  MealsScreenArguments({required this.categoryTitle, required this.categoryId});
}

class MealsScreen extends StatefulWidget {
  static const routeName = '/meals';

  const MealsScreen({Key? key}) : super(key: key);

  @override
  State<MealsScreen> createState() => _MealsScreenState();
}

class _MealsScreenState extends State<MealsScreen> {
  late String categoryTitle;
  late List<Meal> displayedMeals;
  
  @override
  void didChangeDependencies() {
    final routeArguments =
        ModalRoute.of(context)!.settings.arguments as MealsScreenArguments;

    categoryTitle = routeArguments.categoryTitle;
    final categoryId = routeArguments.categoryId;
     displayedMeals =
        meals.where((meal) => meal.categories.contains(categoryId)).toList();

    super.didChangeDependencies();
  }

  void _removeMeal(String mealId) {
    setState(() {
      displayedMeals.removeWhere((meal) => meal.id == mealId);
    });
  }

  // final String categoryId;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(categoryTitle),
        ),
        body: ListView.builder(
          itemBuilder: (ctx, index) {
            return MealItem(
                id: displayedMeals[index].id,
                title: displayedMeals[index].title,
                imageUrl: displayedMeals[index].imageUrl,
                duration: displayedMeals[index].duration,
                complexity: displayedMeals[index].complexity,
                affordability: displayedMeals[index].affordability,
                removeMeal: _removeMeal,);
          },
          itemCount: displayedMeals.length,
        ));
  }
}
