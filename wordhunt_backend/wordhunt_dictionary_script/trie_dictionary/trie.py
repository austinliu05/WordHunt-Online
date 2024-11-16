import json

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_word = True

    def to_dict(self) -> dict:
        def node_to_dict(node):
            return {
                'children': {k: node_to_dict(v) for k, v in node.children.items()},
                'is_word': node.is_word
            }
        return node_to_dict(self.root)

    @staticmethod
    def from_dict(data: dict) -> 'Trie':
        def dict_to_node(data):
            node = TrieNode()
            node.children = {k: dict_to_node(v) for k, v in data['children'].items()}
            node.is_word = data['is_word']
            return node

        trie = Trie()
        trie.root = dict_to_node(data)
        return trie

def save_trie_to_file(trie: Trie, filepath: str) -> None:
    with open(filepath, 'w') as f:
        json.dump(trie.to_dict(), f, indent=2)
    print(f"Trie saved to {filepath}")

def parse_words_from_txt(filepath: str) -> list:
    """
    Parse words from a text file. Each word should be on a new line.

    Args:
        filepath (str): The path to the text file.

    Returns:
        list: A list of words extracted from the text file.
    """
    with open(filepath, 'r') as f:
        words = [line.strip() for line in f if line.strip()]
    return words

if __name__ == "__main__":
    dictionary_path = "../words.txt"

    words = parse_words_from_txt(dictionary_path)

    trie = Trie()
    for word in words:
        trie.insert(word)
    save_trie_to_file(trie, "trie_dictionary.json")
