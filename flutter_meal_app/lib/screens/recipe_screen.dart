import 'package:flutter/material.dart';

import '../models/meal.dart';

class RecipeScreenArguments {
  final String mealId;

  RecipeScreenArguments({required this.mealId});
}

class RecipeScreen extends StatelessWidget {
  static const routeName = '/recipe';

  const RecipeScreen({Key? key}) : super(key: key);

  Widget _buildSectionTitle(BuildContext ctx, String title) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 10),
      child: Text(
        title,
        style: Theme.of(ctx).textTheme.headline6,
      ),
    );
  }

  Widget _buildList(BuildContext ctx, List<String> list) {
    return SizedBox(
      width: double.infinity,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ...list
              .map((item) => Padding(
                    padding:
                        const EdgeInsets.symmetric(vertical: 5, horizontal: 10),
                    child: Text(
                      item,
                      style: Theme.of(ctx).textTheme.bodyText1,
                    ),
                  ))
              .toList()
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final routeArguments =
        ModalRoute.of(context)!.settings.arguments as RecipeScreenArguments;
    final mealId = routeArguments.mealId;

    final recipe = meals.firstWhere((meal) => meal.id == mealId);

    return Scaffold(
      appBar: AppBar(
        title: Text(recipe.title),
      ),
      body: SingleChildScrollView(
        child: Column(children: [
          SizedBox(
              height: 300,
              width: double.infinity,
              child: Image.network(
                recipe.imageUrl,
                fit: BoxFit.cover,
                errorBuilder: (ctx, obj, stack) {
                  return const SizedBox(
                    height: 300,
                    width: double.infinity,
                    child: DecoratedBox(
                        decoration: BoxDecoration(
                            color: Color.fromARGB(155, 227, 218, 218))),
                  );
                },
              )),
          _buildSectionTitle(context, "Ingredients"),
          _buildList(context, recipe.ingredients),
          _buildSectionTitle(context, "Steps"),
          SizedBox(
              width: double.infinity,
              child: ListView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemBuilder: (ctx, index) => ListTile(
                    leading: CircleAvatar(backgroundColor: Colors.amber, child: Text('# ${index + 1}')),
                    title: Text(recipe.steps[index])),
                itemCount: recipe.steps.length,
              ))
        ]),
      ),
    );
  }
}
