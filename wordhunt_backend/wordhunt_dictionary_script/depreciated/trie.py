import json
import os

class TrieNode:
    """A node in the Trie structure, representing a character in a word."""

    def __init__(self):
        """Initialize the Trie node with an empty children dictionary and an is_word flag."""
        self.children = {}
        self.is_word = False

class Trie:
    """
    A Trie (prefix tree) data structure for storing and searching words efficiently.
    Each word is broken down into characters, and nodes are linked through children.
    """

    def __init__(self):
        """Initialize the Trie with an empty root node."""
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        """
        Insert a word into the Trie.

        Args:
            word (str): The word to insert into the Trie.
        """
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_word = True

    def search(self, word: str) -> bool:
        """
        Search for a word in the Trie.

        Args:
            word (str): The word to search for in the Trie.

        Returns:
            bool: True if the word exists in the Trie, False otherwise.
        """
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_word

    def to_dict(self) -> dict:
        """
        Convert the Trie to a dictionary format for serialization.

        Returns:
            dict: A dictionary representation of the Trie structure.
        """
        def node_to_dict(node):
            return {
                'children': {k: node_to_dict(v) for k, v in node.children.items()},
                'is_word': node.is_word
            }
        return node_to_dict(self.root)

    @staticmethod
    def from_dict(data: dict) -> 'Trie':
        """
        Reconstruct a Trie from a dictionary format.

        Args:
            data (dict): The dictionary representation of the Trie.

        Returns:
            Trie: A Trie object reconstructed from the dictionary.
        """
        def dict_to_node(data):
            node = TrieNode()
            node.children = {k: dict_to_node(v) for k, v in data['children'].items()}
            node.is_word = data['is_word']
            return node

        trie = Trie()
        trie.root = dict_to_node(data)
        return trie

def build_trie_from_file(dictionary_path: str) -> Trie:
    """
    Build a Trie from a JSON file containing words.

    Args:
        dictionary_path (str): The path to the JSON file containing the word dictionary.

    Returns:
        Trie: A Trie object populated with the words from the JSON file.
    """
    with open(dictionary_path, 'r') as f:
        word_dict = json.load(f)

    trie = Trie()
    for word in word_dict.keys():
        trie.insert(word)
    
    return trie

def save_trie_to_file(trie: Trie, filepath: str) -> None:
    """
    Save a Trie to a JSON file for later use.

    Args:
        trie (Trie): The Trie object to save.
        filepath (str): The path to the JSON file where the Trie will be saved.
    """
    with open(filepath, 'w') as f:
        json.dump(trie.to_dict(), f)
    print(f"Trie saved to {filepath}")

def load_trie_from_file(filepath: str) -> Trie:
    """
    Load a Trie from a JSON file.

    Args:
        filepath (str): The path to the JSON file containing the serialized Trie.

    Returns:
        Trie: A Trie object loaded from the JSON file.
    """
    with open(filepath, 'r') as f:
        data = json.load(f)
    return Trie.from_dict(data)


if __name__ == "__main__":
    if os.path.exists("raw_dictionary.json") and os.path.exists("trie_dictionary.json"):
        trie = build_trie_from_file('raw_dictionary.json')
        save_trie_to_file(trie, 'trie_dictionary.json')
