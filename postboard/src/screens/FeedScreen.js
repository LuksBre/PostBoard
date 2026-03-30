import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View, Text, FlatList, StyleSheet,
  TouchableOpacity, RefreshControl,
} from 'react-native';
import { getPostsPorUsuario } from '../services/api';
import PostCard from '../components/PostCard';
import LoadingIndicator from '../components/LoadingIndicator';
import EmptyState from '../components/EmptyState';

export default function FeedScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 10;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('FormularioTab')}
          style={{ marginRight: 4, padding: 4 }}
        >
          <Text style={{ color: '#fff', fontSize: 28, fontWeight: '300' }}>+</Text>
        </TouchableOpacity>
      ),
      title: `Posts (${posts.length})`
    });
  }, [navigation, posts]);

  useEffect(() => {
    carregarPosts();
  }, []);

  async function carregarPosts() {
    try {
      setLoading(true);
      setErro(null);
      const dados = await getPostsPorUsuario(1);
      setPosts(dados.slice(0, limit));
    } catch (e) {
      setErro('Não foi possível carregar os posts.\nVerifique sua conexão.');
    } finally {
      setLoading(false);
    }
  }

  async function carregarMais() {
    const novaPagina = page + 1;
    const dados = await getPostsPorUsuario(1);
    const novos = dados.slice(0, novaPagina * limit);

    setPosts(novos);
    setPage(novaPagina);
  }

  async function onRefresh() {
    try {
      setRefreshing(true);
      setErro(null);
      const dados = await getPostsPorUsuario(1);
      setPosts(dados.slice(0, limit));
      setPage(1);
    } catch (e) {
      setErro('Erro ao atualizar.');
    } finally {
      setRefreshing(false);
    }
  }

  if (loading) {
    return <LoadingIndicator mensagem="Carregando posts..." />;
  }

  if (erro && posts.length === 0) {
    return (
      <EmptyState
        icone="⚠️"
        titulo="Ops! Algo deu errado"
        mensagem={erro}
        textoBotao="Tentar novamente"
        onBotao={carregarPosts}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onPress={() => navigation.navigate('Detalhes', { post: item })}
          />
        )}
        ListFooterComponent={
          <TouchableOpacity onPress={carregarMais} style={{ padding: 16 }}>
            <Text style={{ textAlign: 'center', color: '#1a56db' }}>
              Carregar mais
            </Text>
          </TouchableOpacity>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={
          posts.length === 0 ? styles.listaVazia : styles.lista
        }
        ItemSeparatorComponent={() => <View style={styles.separador} />}
      />
    </View>
  );
}