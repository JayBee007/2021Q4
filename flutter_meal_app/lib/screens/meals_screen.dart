import 'package:flutter/material.dart';

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
    return Scaffold(
      appBar: AppBar(
        title: Text(categoryTitle),
      ),
      body: const Center(child: Text('The Recipes for the category')),
    );
  }
}
