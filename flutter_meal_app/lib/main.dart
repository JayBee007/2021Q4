import 'package:flutter/material.dart';

import './screens/categories_screen.dart';

void main() => runApp(const MealApp());

class MealApp extends StatelessWidget {
  const MealApp({Key? key}) : super(key: key);


  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Meals',
      theme: ThemeData(
        primarySwatch: Colors.blue
      ),home: CategoriesScreen(key: key),);
  }
}

