import 'package:flutter/material.dart';

import '../models/meal.dart';
import '../components/meal_item.dart';

class MealsScreenArguments {
  final String categoryTitle;
  final String categoryId;

  MealsScreenArguments({required this.categoryTitle, required this.categoryId});
}

class MealsScreen extends StatelessWidget {
  static const routeName = '/meals';

  const MealsScreen({Key? key}) : super(key: key);

  // final String categoryId;
  // final String categoryTitle;

  // const MealsScreen(
  //     {Key? key, required this.categoryId, required this.categoryTitle})
  //     : super(key: key);

  @override
  Widget build(BuildContext context) {
    final routeArguments =
        ModalRoute.of(context)!.settings.arguments as MealsScreenArguments;

    final categoryTitle = routeArguments.categoryTitle;
    final categoryId = routeArguments.categoryId;
    final categoryMeals =
        meals.where((meal) => meal.categories.contains(categoryId)).toList();

    return Scaffold(
        appBar: AppBar(
          title: Text(categoryTitle),
        ),
        body: ListView.builder(
          itemBuilder: (ctx, index) {
            return MealItem(
                title: categoryMeals[index].title,
                imageUrl: categoryMeals[index].imageUrl,
                duration: categoryMeals[index].duration,
                complexity: categoryMeals[index].complexity,
                affordability: categoryMeals[index].affordability);
          },
          itemCount: categoryMeals.length,
        ));
  }
}
