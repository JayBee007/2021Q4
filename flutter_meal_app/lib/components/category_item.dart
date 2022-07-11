import 'package:flutter/material.dart';

import '../screens/meals_screen.dart';

class CategoryItem extends StatelessWidget {
  final String id;
  final String title;
  final Color color;

  const CategoryItem(
      {Key? key, required this.id, required this.title, required this.color})
      : super(key: key);

  void _selectCategory(context) {
    // Navigator.of(context).push(MaterialPageRoute(builder: (_) {
    //   return MealsScreen(categoryTitle: title, categoryId: id,);
    // }));

    Navigator.of(context).pushNamed('/meals',
        arguments: MealsScreenArguments(categoryTitle: title, categoryId: id));
  }

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => _selectCategory(context),
      splashColor: Theme.of(context).primaryColor,
      borderRadius: BorderRadius.circular(15),
      child: Container(
        padding: const EdgeInsets.all(15),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(15),
          gradient: LinearGradient(
              colors: [color.withOpacity(0.7), color],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight),
        ),
        child: Text(title, style: Theme.of(context).textTheme.headline6),
      ),
    );
  }
}
