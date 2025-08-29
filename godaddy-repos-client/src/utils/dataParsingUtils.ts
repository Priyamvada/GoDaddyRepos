import { Icons } from "../assets";

export function snakeToCamel(input: string): string {
  return input.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export const LanguageIcon: { [key: string]: string } = {
  JavaScript: Icons.javaScript,
  Python: Icons.python,
  Ruby: Icons.ruby,
  PHP: Icons.php,
  'Objective-C': Icons.objC,
  'C#': Icons.csharp,
  default: Icons.genericCode,
};